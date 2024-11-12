package com.example.backend.service;

import com.example.backend.model.Reward;
import com.example.backend.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RewardService {

    private final RewardRepository rewardRepository;

    @Autowired
    public RewardService(RewardRepository rewardRepository) {
        this.rewardRepository = rewardRepository;
    }

    // RewardService.java
    public List<Reward> getAllRewards() {
        List<Reward> rewards = rewardRepository.findAll();
        if (rewards.isEmpty()) {
            System.out.println("No rewards found in the database.");
        }
        return rewards;
    }


    // Get reward by ID
    public Optional<Reward> getRewardById(int rewardId) {
        return rewardRepository.findById(rewardId);
    }

    // Create or update a reward
    public Reward saveReward(Reward reward) {
        return rewardRepository.save(reward);
    }

    public void updateReward(int rewardId, int points)
    {
       rewardRepository.updatePointsRequiredById(rewardId, points);
    }
    // Delete a reward
    public void deleteReward(int rewardId) {
        rewardRepository.deleteById(rewardId);
    }

    // Custom queries
    public List<Reward> getRewardsByPointsLessThan(int points) {
        return rewardRepository.findByPointsRequiredLessThan(points);
    }

    public List<Reward> getRewardsByNameContaining(String name) {
        return rewardRepository.findByRewardNameContaining(name);
    }

    public List<Reward> getRewardsByPointsGreaterThan(int points) {
        return rewardRepository.findByPointsRequiredGreaterThan(points);
    }


    public List<Reward> getRewardsByPointsBetween(int minPoints, int maxPoints) {
        return rewardRepository.findByPointsRequiredBetween(minPoints, maxPoints);
    }
}
