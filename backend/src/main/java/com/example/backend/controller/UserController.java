package com.example.backend.controller;

import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{userId}/points")
    public PointsResponse getPoints(@PathVariable Integer userId) {
        int points = userService.getUserPoints(userId);

            return new PointsResponse(points);

    }

    @PostMapping("/{userId}/points/add")
    public void addPoints(@PathVariable Integer userId, @RequestParam int points, @RequestParam String description) {
        userService.addPoints(userId, points, description);
    }

    @PostMapping("/{userId}/points/redeem")
    public void redeemPoints(@PathVariable Integer userId, @RequestParam int points, @RequestParam String description) {
        userService.redeemPoints(userId, points, description);
    }

    @GetMapping("/test")
    public String test() {
        return "API is working!";
    }

    static class PointsResponse {
        private int points;

        public PointsResponse(int points) {
            this.points = points;
        }

        public int getPoints() {
            return points;
        }
    }
}
