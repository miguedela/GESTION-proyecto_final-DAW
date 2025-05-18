package com.gestion.backend.entity;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.gestion.backend.dto.ReservationDTO;
import com.gestion.backend.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "reservation")
public class Reservation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "customer_id", nullable = false, unique = false)
	private OurUser customer;

	@ManyToOne
	@JoinColumn(name = "restaurant_id", nullable = false, unique = false)
	private Restaurant restaurant;

	@Column(name = "reservation_number", nullable = false, unique = false)
	private int reservationNumber;

	@Column(name = "status", nullable = false, unique = false)
	private Status status;

	@Column(name = "reservation_time", nullable = false, unique = false)
	private LocalDateTime reservationTime;

	public Reservation(ReservationDTO reservationDTO) {
		this.id = reservationDTO.getId();
		this.customer = reservationDTO.getCustomer();
		this.restaurant = reservationDTO.getRestaurant();
		this.reservationTime = reservationDTO.getReservationTime();
		this.reservationNumber = reservationDTO.getReservationNumber();
	}

}
