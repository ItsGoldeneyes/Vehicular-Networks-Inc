package com.example.backend.service;

import com.example.backend.model.Activity;
import com.example.backend.model.User;
import com.example.backend.repository.ActivityRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityRepository activityRepository;

    public int getUserPoints(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user != null ? user.getPointsBalance() : 0; // Return 0 if user not found
    }

    public void addPoints(Integer userId, int points, String description) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setPointsBalance(user.getPointsBalance() + points);
            userRepository.save(user); // Update user points
            logActivity(user, "EARNED", description);
        }
    }

    public void redeemPoints(Integer userId, int points, String description) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null && user.getPointsBalance() >= points) {
            user.setPointsBalance(user.getPointsBalance() - points);
            userRepository.save(user); // Update user points
            logActivity(user, "REDEEMED", description);
        }
    }

    private void logActivity(User user, String type, String description) {
        Activity activity = new Activity(user, type, description);
        activityRepository.save(activity);
    }
}
