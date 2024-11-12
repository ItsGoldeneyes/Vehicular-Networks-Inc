package com.example.backend.repository;

import com.example.backend.model.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface RewardRepository extends JpaRepository<Reward, Integer> {



    // Default findAll() method is already provided by JpaRepository
    @Query("SELECT r FROM Reward r ORDER BY r.pointsRequired ASC")
    List<Reward> findAll();

    @Modifying
    @Transactional
    @Query("UPDATE Reward r SET r.pointsRequired = ?2 WHERE r.rewardId = ?1")
    int updatePointsRequiredById(int rewardId, int points);


    // Custom query to find rewards with fewer points required
    List<Reward> findByPointsRequiredLessThan(int points);

    // Custom query to find rewards by their name (contains the given substring)
    List<Reward> findByRewardNameContaining(String name);

    // Custom query to find rewards with points required greater than a specified number
    List<Reward> findByPointsRequiredGreaterThan(int points);

    // Custom query to find rewards by exact name match
    List<Reward> findByRewardName(String rewardName);

    // Custom query to find rewards with points required in a certain range
    List<Reward> findByPointsRequiredBetween(int minPoints, int maxPoints);
}
