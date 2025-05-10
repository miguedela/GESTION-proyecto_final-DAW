package com.gestion.backend.service.impl;

import org.springframework.stereotype.Service;

import com.gestion.backend.dto.RestaurantStaffDTO;
import com.gestion.backend.exception.DuplicateResourceException;
import com.gestion.backend.repository.RestaurantStaffRepository;
import com.gestion.backend.service.RestaurantStaffService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RestaurantStaffServiceImpl implements RestaurantStaffService {

	private final RestaurantStaffRepository restaurantStaffRepository;

	@Override
	public RestaurantStaffDTO createRestaurantStaff(RestaurantStaffDTO registrationRestaurantStaffDTO) {
		
		if (restaurantStaffRepository.findByRestaurantId(registrationRestaurantStaffDTO.getRestaurantId()).isPresent())
			throw new DuplicateResourceException("El restaurante ya tiene a un Staff");
		
//		if (restaurantStaffRepository.findByStaffId(registrationRestaurantStaffDTO.getStaffId()).isPresent())
//			throw new DuplicateResourceException("Este Staff ya tiene un restaurante asignado.");

		
		
		return null;
	}

	@Override
	public void deleteRestaurantStaff(Long id) {
		// TODO Auto-generated method stub

	}

}
