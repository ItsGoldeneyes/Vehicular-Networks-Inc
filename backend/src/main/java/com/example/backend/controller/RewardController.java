package com.example.backend.controller;

import com.example.backend.model.Reward;
import com.example.backend.service.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rewards")
public class RewardController {

    private final RewardService rewardService;

    @Autowired
    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }

    // Get all rewards
    @GetMapping("/all")
    public List<Reward> getAllRewards() {
        return rewardService.getAllRewards();
    }

    // Get reward by ID
    @GetMapping("/{id}")
    public ResponseEntity<Reward> getRewardById(@PathVariable("id") int rewardId) {
        Optional<Reward> reward = rewardService.getRewardById(rewardId);
        if (reward.isPresent()) {
            return ResponseEntity.ok(reward.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Create or update a reward
    @PostMapping
    public ResponseEntity<Reward> createReward(@RequestBody Reward reward) {
        Reward savedReward = rewardService.saveReward(reward);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReward);
    }

    @PostMapping("/{id}/{points}")
    public ResponseEntity<Reward> updateReward(@PathVariable("id") int rewardId, @PathVariable("points") int points) {
       rewardService.updateReward(rewardId, points);
       return ResponseEntity.noContent().build();
    }
    // Delete a reward by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReward(@PathVariable("id") int rewardId) {
        rewardService.deleteReward(rewardId);
        return ResponseEntity.noContent().build();
    }

    // Custom queries
    @GetMapping("/points-less-than/{points}")
    public List<Reward> getRewardsByPointsLessThan(@PathVariable("points") int points) {
        return rewardService.getRewardsByPointsLessThan(points);
    }

    @GetMapping("/name-containing/{name}")
    public List<Reward> getRewardsByNameContaining(@PathVariable("name") String name) {
        return rewardService.getRewardsByNameContaining(name);
    }

    @GetMapping("/points-greater-than/{points}")
    public List<Reward> getRewardsByPointsGreaterThan(@PathVariable("points") int points) {
        return rewardService.getRewardsByPointsGreaterThan(points);
    }


    @GetMapping("/points-between/{minPoints}/{maxPoints}")
    public List<Reward> getRewardsByPointsBetween(@PathVariable("minPoints") int minPoints, @PathVariable("maxPoints") int maxPoints) {
        return rewardService.getRewardsByPointsBetween(minPoints, maxPoints);
    }
}
