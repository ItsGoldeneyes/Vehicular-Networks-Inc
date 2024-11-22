package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(name = "username", unique = true, nullable = false, length = 50)
    private String username;

    @Column(name = "points_balance", nullable = false)
    private Integer pointsBalance;

    @Column(name = "reward_points", nullable = false)
    private Integer rewardPoints;  // Added reward points field

    // Default constructor for JPA
    public User() {
        this.rewardPoints = 0; // Default to 0 reward points
    }

    // Constructor for creating a new User without userId
    public User(String username, Integer pointsBalance, Integer rewardPoints) {
        this.username = username;
        this.pointsBalance = pointsBalance;
        this.rewardPoints = rewardPoints;  // Set reward points
    }

    // Getters and Setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getPointsBalance() {
        return pointsBalance;
    }

    public void setPointsBalance(Integer pointsBalance) {
        this.pointsBalance = pointsBalance;
    }

    public Integer getRewardPoints() {
        return rewardPoints;  // Getter for reward points
    }

    public void setRewardPoints(Integer rewardPoints) {
        this.rewardPoints = rewardPoints;  // Setter for reward points
    }
}
