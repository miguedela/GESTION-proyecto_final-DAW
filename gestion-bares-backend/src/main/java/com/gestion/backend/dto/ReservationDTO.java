package com.gestion.backend.dto;

import java.time.LocalDateTime;

import com.gestion.backend.entity.OurUser;
import com.gestion.backend.entity.Restaurant;
import com.gestion.backend.enums.ReservationStatus;

import lombok.Data;

@Data
public class ReservationDTO {

	private Long id;
	private OurUser customer;
	private Restaurant restaurant;
	private int reservationNumber;
	private ReservationStatus status;
	private LocalDateTime reservationTime;

}
