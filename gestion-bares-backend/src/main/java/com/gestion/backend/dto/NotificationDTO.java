package com.gestion.backend.dto;

import com.gestion.backend.enums.NotificationStatus;

import lombok.Data;

@Data
public class NotificationDTO {

	private Long id;
	private Long senderId;
	private Long receiverId;
	private Long reservationId;
	private NotificationStatus status;

}
