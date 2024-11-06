package com.example.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activities")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer activityId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String type; // e.g., "EARNED", "REDEEMED"

    @Column(length = 255)
    private String description; // Description of the activity

    @Column(nullable = false)
    private LocalDateTime timestamp; // When the activity occurred

    @Column(nullable = false)
    private int pointsChange;

    // Constructor for creating a new Activity
    public Activity(User user, String type, String description) {
        this.user = user;
        this.type = type;
        this.description = description;
        this.timestamp = LocalDateTime.now(); // Set the current timestamp
    }

    // Default constructor for JPA
    public Activity() {}

    // Getters and Setters
    public Integer getActivityId() {
        return activityId;
    }

    public void setActivityId(Integer activityId) {
        this.activityId = activityId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    public void setPointsChange(int pointsChange) {
        this.pointsChange = pointsChange;
    }
}
