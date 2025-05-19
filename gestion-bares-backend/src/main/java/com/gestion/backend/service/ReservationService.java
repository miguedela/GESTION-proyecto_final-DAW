package com.gestion.backend.service;

import java.util.List;

import com.gestion.backend.dto.ReservationDTO;

public interface ReservationService {

	public ReservationDTO createReservation(ReservationDTO reservation);

	public void deleteReservation(Long reservationId);

	public ReservationDTO updateReservation(ReservationDTO reservation);

	public ReservationDTO getReservationById(Long id);

	public List<ReservationDTO> getReservationByRestaurant(Long restaurantId);

	public List<ReservationDTO> getReservationByCustomer(Long customerId);

}
