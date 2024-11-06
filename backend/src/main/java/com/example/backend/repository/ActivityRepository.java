package com.example.backend.repository;

import com.example.backend.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Integer> {
    List<Activity> findByUser_UserId(Integer userId);


}
