package com.gestion.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion.backend.entity.Dish;
import com.gestion.backend.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

	Optional<List<Notification>> findBySenderId(Long restaurantId);

	Optional<List<Notification>> findByReceiverId(Long userId);

}
