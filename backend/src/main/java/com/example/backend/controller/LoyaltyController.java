package com.example.backend.controller;

import com.example.backend.model.Reward;
import com.example.backend.model.User;
import com.example.backend.service.LoyaltyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/loyalty")
public class LoyaltyController {

    @Autowired
    private LoyaltyService loyaltyService;

    // Redeem Reward endpoint
    @PostMapping("/redeem/{rewardId}/{userId}")
    public ResponseEntity<String> redeemReward(
            @PathVariable("rewardId") int rewardId,  // Extract rewardId from path
            @PathVariable("userId") int userId) {   // Extract userId from path

        try {
            // Fetch the reward and user from the database
            Reward reward = loyaltyService.getRewardById(rewardId);
            User user = loyaltyService.getUserById(userId);

            // Check if the user exists
            if (user == null) {
                return ResponseEntity.status(404).body("User not found.");
            }

            // Check if the reward exists
            if (reward == null) {
                return ResponseEntity.status(404).body("Reward not found.");
            }

            // Check if the user has enough points
            if (user.getPointsBalance() >= reward.getPointsRequired()) {
                // Redeem points (update user's points)
                loyaltyService.redeemReward(user, reward);
                return ResponseEntity.ok("Successfully redeemed reward: " + reward.getRewardName());
            } else {
                return ResponseEntity.status(400).body("Insufficient points to redeem this reward.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error redeeming reward: " + e.getMessage());
        }
    }
}
