package com.gestion.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion.backend.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	List<Reservation> findByRestaurantId(Long resturantId);

	List<Reservation> findByCustomerId(Long customerId);

}
