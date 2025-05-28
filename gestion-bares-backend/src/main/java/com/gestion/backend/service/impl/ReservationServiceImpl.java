package com.gestion.backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gestion.backend.dto.ReservationDTO;
import com.gestion.backend.entity.Reservation;
import com.gestion.backend.exception.ResourceNotFoundException;
import com.gestion.backend.repository.ReservationRepository;
import com.gestion.backend.repository.RestaurantRepository;
import com.gestion.backend.repository.UserRepository;
import com.gestion.backend.service.ReservationService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

	private final ReservationRepository reservationRepository;
	private final RestaurantRepository restaurantRepository;
	private final UserRepository customerRepository;

	@Override
	public ReservationDTO createReservation(ReservationDTO reservationDTO) {
		// Fecha de reserva futura
		if (reservationDTO.getReservationTime().isBefore(LocalDateTime.now())) {
			throw new IllegalArgumentException("La fecha de la reserva debe ser futura.");
		}
		// Validar que el restaurante exista
		if (!restaurantRepository.existsById(reservationDTO.getRestaurant().getId())) {
			throw new ResourceNotFoundException("Restaurante no encontrado.");
		}
		// Validar que el cliente exista
		if (!customerRepository.existsById(reservationDTO.getCustomer().getId())) {
			throw new ResourceNotFoundException("Cliente no encontrado.");
		}
		// Devolver la capacidad del restaurante
		int capacity = restaurantRepository.findById(reservationDTO.getRestaurant().getId())
				.orElseThrow(() -> new ResourceNotFoundException("Restaurante no encontrado.")).getCustomerAmount();

		// Calcular una hora de inicio y fin para la reserva
		LocalDateTime start = reservationDTO.getReservationTime().withMinute(0).withSecond(0).withNano(0);
		LocalDateTime end = start.plusHours(1);

		// Verificar si hay reservas existentes en ese rango de tiempo
		List<Reservation> reservations = reservationRepository
				.findByRestaurantIdAndReservationTimeBetween(reservationDTO.getRestaurant().getId(), start, end);

		// Validar capacidad
		if (reservations.size() >= capacity) {
			throw new IllegalArgumentException("No hay disponibilidad para la hora seleccionada.");
		}

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
		// Validar que la reserva existe
		reservationRepository.findById(reservationDTO.getId()).orElseThrow(
				() -> new ResourceNotFoundException("Reserva no econtrada con ID: " + reservationDTO.getId()));

		// Validar que la fecha de reserva es futura
		if (reservationDTO.getReservationTime().isBefore(LocalDateTime.now())) {
			throw new IllegalArgumentException("La fecha de la reserva debe ser futura.");
		}
		// Validar que el restaurante existe
		if (!restaurantRepository.existsById(reservationDTO.getRestaurant().getId())) {
			throw new ResourceNotFoundException("Restaurante no encontrado.");
		}
		// Validar que el cliente existe
		if (!customerRepository.existsById(reservationDTO.getCustomer().getId())) {
			throw new ResourceNotFoundException("Cliente no encontrado.");
		}
		// Obtener la capacidad del restaurante
		int capacity = restaurantRepository.findById(reservationDTO.getRestaurant().getId())
				.orElseThrow(() -> new ResourceNotFoundException("Restaurante no encontrado.")).getCustomerAmount();

		// Calcular una hora de inicio y fin para la reserva
		LocalDateTime start = reservationDTO.getReservationTime().withMinute(0).withSecond(0).withNano(0);
		LocalDateTime end = start.plusHours(1);

		// Obtener reservas existentes en ese rango de tiempo
		List<Reservation> reservations = reservationRepository
				.findByRestaurantIdAndReservationTimeBetween(reservationDTO.getRestaurant().getId(), start, end)
				.stream().filter(r -> !r.getId().equals(reservationDTO.getId())).toList();

		// Validar capacidad
		if (reservations.size() >= capacity) {
			throw new IllegalArgumentException("No hay disponibilidad para la hora seleccionada.");
		}

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
