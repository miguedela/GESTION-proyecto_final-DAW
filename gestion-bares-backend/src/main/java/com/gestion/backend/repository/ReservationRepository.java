package com.gestion.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion.backend.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	List<Reservation> findByRestaurantId(Long resturantId);

	List<Reservation> findByCustomerId(Long customerId);

	List<Reservation> findByRestaurantIdAndReservationTimeBetween(Long id, LocalDateTime start, LocalDateTime end);

}
