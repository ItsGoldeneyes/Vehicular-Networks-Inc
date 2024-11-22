package com.example.backend.controller;

import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.backend.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/find/{username}")
    public User findByUsername( @PathVariable("username")String username) {
        logger.info("Searching for user with username: {}", username);
        return userService.findByUsername(username);


    }
    @GetMapping("/userId/{username}")
    public ResponseEntity<Integer> getUserIdByUsername(@PathVariable("username") String username) {
        Integer userId = userService.getUserIdByUsername(username);
        if (userId != null) {
            return ResponseEntity.ok(userId);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{userId}/points")
    public PointsResponse getPoints(@PathVariable Integer userId) {
        int points = userService.getUserPoints(userId);

        return new PointsResponse(points);

    }
    @PostMapping("/addOrUpdate")
    public User addOrUpdateUser(@RequestBody User user) {
        // Check if the user already exists based on username or email
        User existingUser = userService.findByUsername(user.getUsername());
        if (existingUser == null) {
            // If user doesn't exist, create a new user
            return userService.saveUser(user);
        } else {
            // If user exists, return the existing user
            return existingUser;
        }
    }

    @PostMapping("/{userId}/points/add")
    public void addPoints(@PathVariable Integer userId, @RequestParam int points, @RequestParam String description) {
        userService.addPoints(userId, points, description);
    }

    @PostMapping("/{userId}/points/redeem")
    public void redeemPoints(@PathVariable Integer userId, @RequestParam int points, @RequestParam String description) {
        userService.redeemPoints(userId, points, description);
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
