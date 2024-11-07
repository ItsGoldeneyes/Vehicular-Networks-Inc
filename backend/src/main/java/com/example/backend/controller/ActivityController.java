package com.example.backend.controller;

import com.example.backend.model.Activity;
import com.example.backend.model.Reward;
import com.example.backend.service.ActivityService;
import com.example.backend.service.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ActivityController {

    private final ActivityService activityService;
    private final RewardService rewardService;

    @Autowired
    public ActivityController(ActivityService activityService, RewardService rewardService) {
        this.activityService = activityService;
        this.rewardService = rewardService;

    }

    @GetMapping("/activities/{userId}")
    public List<Activity> getActivities(@PathVariable Integer userId) {
        return activityService.getActivitiesByUserId(userId);
    }


    @PostMapping("/activities/{userId}/{rewardId}")
    public Activity addActivity(
            @PathVariable Integer userId,   // The user ID as part of the URL path
            @PathVariable Integer rewardId, // The reward ID as part of the URL path
            @RequestParam String type) {    // The type of activity (e.g., REDEEMED)

        // Fetch the reward by its ID from the RewardService
        Optional<Reward> reward = rewardService.getRewardById(rewardId);

        // Check if the reward is present
        if (reward.isEmpty()) {
            throw new RuntimeException("Reward not found with ID: " + rewardId);
        }

        // Construct the description for the activity, including the reward name
        String description = "REDEEMED reward: " + reward.get().getRewardName(); // Access reward name safely

        // Create and save the activity with userId, type, and the constructed description
        return activityService.addActivity(userId, type, rewardId, description);
    }

}
