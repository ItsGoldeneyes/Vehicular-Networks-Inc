package com.example.backend.repository;

import com.example.backend.model.PointsTransaction;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PointsTransactionRepository extends JpaRepository<PointsTransaction, Integer> {
    List<PointsTransaction> findByUser(User user);
}
