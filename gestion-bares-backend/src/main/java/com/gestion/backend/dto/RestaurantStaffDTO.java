package com.gestion.backend.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class RestaurantStaffDTO {

	private Long id;
	private RestaurantDTO restaurant;
	private UserDTO staff;
	private LocalDateTime assignedAt;

}
