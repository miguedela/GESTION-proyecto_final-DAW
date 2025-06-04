package com.gestion.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gestion.backend.dto.NotificationDTO;
import com.gestion.backend.service.NotificationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@AllArgsConstructor
public class NotificationController {

	private final NotificationService notificationService;

	@PostMapping
	public ResponseEntity<Void> createNotification(@RequestBody NotificationDTO notification) {
		notificationService.createNotification(notification);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
		notificationService.deleteNotification(id);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/{id}")
	public ResponseEntity<NotificationDTO> updateNotification(@PathVariable Long id,
			@RequestBody NotificationDTO notification) {
		notification.setId(id);
		return ResponseEntity.ok(notificationService.updateNotification(notification));
	}

	@GetMapping("/{id}")
	public ResponseEntity<NotificationDTO> getNotificationById(@PathVariable Long id) {
		return ResponseEntity.ok(notificationService.getNotificationById(id));
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<NotificationDTO>> getNotificationsByUserId(@PathVariable Long userId) {
		return ResponseEntity.ok(notificationService.getNotificationsBySenderId(userId));
	}

	@GetMapping("/restaurant/{restaurantId}")
	public ResponseEntity<List<NotificationDTO>> getNotificationsByRestaurantId(@PathVariable Long restaurantId) {
		return ResponseEntity.ok(notificationService.getNotificationsByReceiverId(restaurantId));
	}
}
