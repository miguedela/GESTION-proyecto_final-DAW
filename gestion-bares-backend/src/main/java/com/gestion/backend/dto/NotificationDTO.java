package com.gestion.backend.dto;

import com.gestion.backend.entity.OurUser;
import com.gestion.backend.entity.Restaurant;
import com.gestion.backend.enums.NotificationStatus;

import lombok.Data;

@Data
public class NotificationDTO {

	private Long id;
	private Restaurant sender;
	private OurUser receiver;
	private Long reservationId;
	private NotificationStatus status;

}
