package com.gestion.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.gestion.backend.dto.NotificationDTO;
import com.gestion.backend.entity.Notification;
import com.gestion.backend.repository.NotificationRepository;
import com.gestion.backend.service.NotificationService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationServiceIml implements NotificationService {

	private final NotificationRepository notificationRepository;

	@Override
	public void createNotification(NotificationDTO notification) {
		if (notification != null) {
			notificationRepository.save(convertToEntity(notification));
		} else {
			throw new IllegalArgumentException("Notification cannot be null");
		}
	}

	@Override
	public void deleteNotification(Long notificationId) {
		if (notificationRepository.existsById(notificationId)) {
			notificationRepository.deleteById(notificationId);
		} else {
			throw new IllegalArgumentException("Notification with ID " + notificationId + " does not exist");
		}
	}

	@Override
	public NotificationDTO updateNotification(NotificationDTO notification) {
		if (notificationRepository.existsById(notification.getId())) {
			Notification updatedNotification = convertToEntity(notification);
			notificationRepository.save(updatedNotification);
			return convertToDTO(updatedNotification);
		} else {
			throw new IllegalArgumentException("Notification with ID " + notification.getId() + " does not exist");
		}
	}

	@Override
	public NotificationDTO getNotificationById(Long id) {
		return convertToDTO(notificationRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Notification with ID " + id + " does not exist")));
	}

	@Override
	public List<NotificationDTO> getNotificationsBySenderId(Long userId) {
		List<Notification> notifications = notificationRepository.findByReceiverId(userId)
				.orElseThrow(() -> new IllegalArgumentException("No notifications found for user with ID " + userId));
		if (notifications.isEmpty()) {
			throw new IllegalArgumentException("No notifications found for user with ID " + userId);
		}
		return notifications.stream().map(this::convertToDTO).toList();
	}

	@Override
	public List<NotificationDTO> getNotificationsByReceiverId(Long restaurantId) {
		List<Notification> notifications = notificationRepository.findBySenderId(restaurantId).orElseThrow(
				() -> new IllegalArgumentException("No notifications found for restaurant with ID " + restaurantId));
		if (notifications.isEmpty()) {
			throw new IllegalArgumentException("No notifications found for restaurant with ID " + restaurantId);
		}
		return notifications.stream().map(this::convertToDTO).toList();
	}

	private Notification convertToEntity(NotificationDTO notificationDTO) {
		Notification notification = new Notification();
		notification.setId(notificationDTO.getId());
		notification.setSenderId(notificationDTO.getSenderId());
		notification.setReceiverId(notificationDTO.getReceiverId());
		notification.setStatus(notificationDTO.getStatus());
		if (notificationDTO.getReservationId() != null) {
			notification.setReservationId(notificationDTO.getReservationId());
		}
		return notification;
	}

	private NotificationDTO convertToDTO(Notification notification) {
		NotificationDTO notificationDTO = new NotificationDTO();
		notificationDTO.setId(notification.getId());
		notificationDTO.setSenderId(notification.getSenderId());
		notificationDTO.setReceiverId(notification.getReceiverId());
		notificationDTO.setStatus(notification.getStatus());
		if (notification.getReservationId() != null) {
			notificationDTO.setReservationId(notification.getReservationId());
		}
		return notificationDTO;
	}

}
