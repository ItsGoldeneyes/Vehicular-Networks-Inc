package com.example.backend.service;

import com.example.backend.model.Activity;
import com.example.backend.model.Reward;
import com.example.backend.model.User;
import com.example.backend.repository.ActivityRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
    private final RewardService rewardService;

    @Autowired
    public ActivityService(ActivityRepository activityRepository, UserRepository userRepository, RewardService rewardService) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
        this.rewardService = rewardService;
    }

    public List<Activity> getActivitiesByUserId(Integer userId) {
        return activityRepository.findByUser_UserId(userId);
    }

    public Activity addActivity(Integer userId, String type, Integer rewardId, String description) {
        // Fetch the User
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        // Fetch the Reward and get its name
        Reward reward = rewardService.getRewardById(rewardId)
                .orElseThrow(() -> new RuntimeException("Reward not found with ID: " + rewardId));


        // Create and save the activity
        Activity activity = new Activity(user, type, description);
        return activityRepository.save(activity);
    }

    public Activity redeemReward(Integer userId, Integer rewardId) {
        // Fetch the reward by its ID from the RewardService
        Optional<Reward> reward = rewardService.getRewardById(rewardId);

        // Check if the reward is present
        if (reward.isEmpty()) {
            throw new RuntimeException("Reward not found with ID: " + rewardId);
        }

        // Construct the description for the activity, including the reward name
        String description = "Redeemed reward: " + reward.get().getRewardName();

        // Create and save the activity with userId, type as "REDEEMED", and the description
        return addActivity(userId, "REDEEMED", rewardId, description);
    }

}
