package com.gestion.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.gestion.backend.dto.ReservationDTO;
import com.gestion.backend.entity.Reservation;
import com.gestion.backend.exception.ResourceNotFoundException;
import com.gestion.backend.repository.ReservationRepository;
import com.gestion.backend.service.ReservationService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

	private final ReservationRepository reservationRepository;

	@Override
	public ReservationDTO createReservation(ReservationDTO reservationDTO) {
		return convertToDTO(reservationRepository.save(new Reservation(reservationDTO)));
	}

	@Override
	public void deleteReservation(Long reservationId) {
		if (!reservationRepository.existsById(reservationId)) {
			throw new ResourceNotFoundException("Reserva no encontrada con ID: " + reservationId);
		}

		reservationRepository.deleteById(reservationId);
	}

	@Override
	public ReservationDTO updateReservation(ReservationDTO reservationDTO) {
		reservationRepository.findById(reservationDTO.getId()).orElseThrow(
				() -> new ResourceNotFoundException("Reserva no econtrada con ID: " + reservationDTO.getId()));

		return convertToDTO(reservationRepository.save(new Reservation(reservationDTO)));
	}

	@Override
	public ReservationDTO getReservationById(Long reservationId) {
		Reservation reservation = reservationRepository.findById(reservationId)
				.orElseThrow(() -> new ResourceNotFoundException("Reserva no econtrada con ID: " + reservationId));

		return convertToDTO(reservation);
	}

	@Override
	public List<ReservationDTO> getReservationByRestaurant(Long restaurantId) {
		List<Reservation> reservations = reservationRepository.findByRestaurantId(restaurantId);
		if (reservations.isEmpty()) {
			throw new ResourceNotFoundException("No hay reservas para el restaurante con ID: " + restaurantId);
		}
		return reservations.stream().map(this::convertToDTO).toList();
	}

	@Override
	public List<ReservationDTO> getReservationByCustomer(Long customerId) {
		List<Reservation> reservations = reservationRepository.findByCustomerId(customerId);
		if (reservations.isEmpty()) {
			throw new ResourceNotFoundException("No hay reservas para el cliente con ID: " + customerId);
		}
		return reservations.stream().map(this::convertToDTO).toList();
	}

	private ReservationDTO convertToDTO(Reservation reservation) {
		ReservationDTO reservationDTO = new ReservationDTO();
		reservationDTO.setId(reservation.getId());
		reservationDTO.setCustomer(reservation.getCustomer());
		reservationDTO.setRestaurant(reservation.getRestaurant());
		reservationDTO.setReservationTime(reservation.getReservationTime());
		reservationDTO.setStatus(reservation.getStatus());
		reservationDTO.setReservationNumber(reservation.getReservationNumber());
		return reservationDTO;
	}

}
