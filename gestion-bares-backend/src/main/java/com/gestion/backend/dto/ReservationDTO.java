package com.gestion.backend.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gestion.backend.entity.OurUser;
import com.gestion.backend.entity.Restaurant;
import com.gestion.backend.enums.Status;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ReservationDTO {

	private Long id;
	private OurUser customer;
	private Restaurant restaurant;
	private int reservationNumber;
	private Status status;
	private LocalDateTime reservationTime;

}
