package com.gestion.backend.dto;

import java.time.LocalDateTime;

import com.gestion.backend.entity.OurUser;
import com.gestion.backend.entity.Restaurant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationDTO {

	private Long id;
	private OurUser customer;
	private Restaurant restaurant;
	private int reservationNumber;
	private LocalDateTime reservationTime;

}
