package com.example.backend.service;

import com.example.backend.model.Reward;
import com.example.backend.model.User;
import com.example.backend.repository.RewardRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoyaltyService {

    @Autowired
    private RewardRepository rewardRepository;

    @Autowired
    private UserRepository userRepository;

    // Get Reward by ID
    public Reward getRewardById(int rewardId) {
        return rewardRepository.findById(rewardId).orElseThrow(() -> new RuntimeException("Reward not found"));
    }

    // Get User by ID
    public User getUserById(int userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Redeem the Reward and update the user's points
    public void redeemReward(User user, Reward reward) {
        // Deduct points
        user.setPointsBalance(user.getPointsBalance() - reward.getPointsRequired());
        userRepository.save(user); // Save updated user

        // Mark reward as redeemed (optional)
        // reward.setRedeemed(true);
        // rewardRepository.save(reward); // If you want to track redeemed rewards
    }
}
