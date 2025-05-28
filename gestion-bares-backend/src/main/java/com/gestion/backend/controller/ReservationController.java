package com.gestion.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.backend.dto.ReservationDTO;
import com.gestion.backend.service.ReservationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/reservations")
@AllArgsConstructor
public class ReservationController {

	private final ReservationService reservationService;

	@PostMapping
	public ResponseEntity<ReservationDTO> createReservation(@RequestBody ReservationDTO reservationDTO) {
		ReservationDTO createReservation = reservationService.createReservation(reservationDTO);
		return new ResponseEntity<>(createReservation, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ReservationDTO> deleteReservation(@PathVariable Long id) {
		reservationService.deleteReservation(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PutMapping
	public ResponseEntity<ReservationDTO> updateReservation(@RequestBody ReservationDTO reservationDTO) {
		ReservationDTO updateReservation = reservationService.updateReservation(reservationDTO);
		return new ResponseEntity<>(updateReservation, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ReservationDTO> getReservationById(@PathVariable Long id) {
		ReservationDTO reservation = reservationService.getReservationById(id);
		return new ResponseEntity<>(reservation, HttpStatus.OK);
	}

	@GetMapping("/restaurant/{restaurantId}")
	public ResponseEntity<List<ReservationDTO>> getReservationByRestaurantId(@PathVariable Long restaurantId) {
		List<ReservationDTO> reservationsDTO = reservationService.getReservationByRestaurant(restaurantId);
		return new ResponseEntity<>(reservationsDTO, HttpStatus.OK);
	}

	@GetMapping("/customer/{customerId}")
	public ResponseEntity<List<ReservationDTO>> getReservationByCustomerId(@PathVariable Long customerId) {
		List<ReservationDTO> reservationsDTO = reservationService.getReservationByCustomer(customerId);
		return new ResponseEntity<>(reservationsDTO, HttpStatus.OK);
	}

}
