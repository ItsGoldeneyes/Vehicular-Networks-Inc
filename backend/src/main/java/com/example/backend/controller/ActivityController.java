package com.example.backend.controller;



import com.example.backend.model.Activity;
import com.example.backend.model.Reward;
import com.example.backend.model.User;
import com.example.backend.repository.ActivityRepository;
import com.example.backend.repository.RewardRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.ActivityService;
import com.example.backend.service.LoyaltyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ActivityController {

    private final ActivityService activityService;
    private LoyaltyService loyaltyService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RewardRepository rewardRepository;

    @Autowired
    private ActivityRepository activityRepository;


    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/activities/{userId}")
    public List<Activity> getActivities(@PathVariable Integer userId) {
        return activityService.getActivitiesByUserId(userId);
    }
    @PostMapping("/api/loyalty/redeem/{rewardId}/{userId}")
    public ResponseEntity<?> redeemReward(@PathVariable Integer rewardId, @PathVariable Integer userId) {
        // Retrieve user and reward details
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<Reward> optionalReward = rewardRepository.findById(rewardId);

        // Check if user exists
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "User not found"));
        }

        // Check if reward exists
        if (optionalReward.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Reward not found"));
        }

        User user = optionalUser.get();
        Reward reward = optionalReward.get();

        // Check if user has sufficient points
        if (user.getPointsBalance() < reward.getPointsRequired()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Insufficient points"));
        }

        // Deduct points from user and update
        user.setPointsBalance(user.getPointsBalance() - reward.getPointsRequired());
        userRepository.save(user);

        // Create and save the activity log
        Activity activity = new Activity();
        activity.setUser(user);
        activity.setType("REDEEMED");
        activity.setDescription("Redeemed reward: " + reward.getRewardName());
        activity.setTimestamp(LocalDateTime.now());
        activity.setPointsChange(-reward.getPointsRequired()); // Assuming pointsChange field exists

        activityRepository.save(activity);

        return ResponseEntity.ok(Map.of("success", true, "message", "Reward redeemed successfully"));
    }


    @PostMapping("/activities")
    public Activity addActivity(
            @RequestParam Integer userId,
            @RequestParam String type,
            @RequestParam String description) {
        return activityService.addActivity(userId, type, description);
    }
}
