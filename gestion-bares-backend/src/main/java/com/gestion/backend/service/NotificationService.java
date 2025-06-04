package com.gestion.backend.service;

import java.util.List;

import com.gestion.backend.dto.NotificationDTO;

public interface NotificationService {

	public void createNotification(NotificationDTO notification);

	public void deleteNotification(Long notificationId);

	public NotificationDTO updateNotification(NotificationDTO notification);

	public NotificationDTO getNotificationById(Long id);

	public List<NotificationDTO> getNotificationsBySenderId(Long userId);

	public List<NotificationDTO> getNotificationsByReceiverId(Long restaurantId);

}
