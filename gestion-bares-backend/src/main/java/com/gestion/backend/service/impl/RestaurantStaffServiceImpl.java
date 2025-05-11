package com.gestion.backend.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.gestion.backend.dto.RestaurantDTO;
import com.gestion.backend.entity.OurUser;
import com.gestion.backend.entity.Restaurant;
import com.gestion.backend.entity.relation.RestaurantStaff;
import com.gestion.backend.enums.Roles;
import com.gestion.backend.exception.DuplicateResourceException;
import com.gestion.backend.exception.ResourceNotFoundException;
import com.gestion.backend.repository.RestaurantRepository;
import com.gestion.backend.repository.RestaurantStaffRepository;
import com.gestion.backend.repository.UserRepository;
import com.gestion.backend.service.RestaurantStaffService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RestaurantStaffServiceImpl implements RestaurantStaffService {

	private final RestaurantStaffRepository restaurantStaffRepository;
	private final RestaurantRepository restaurantRepository;
	private final UserRepository userRepository;

	@Override
	public List<RestaurantDTO> getRestaurantsByStaff(Long staffId) {
		Streamable<RestaurantStaff> restaurantStaffList = restaurantStaffRepository.findAllByStaffId(staffId);
		List<RestaurantDTO> restaurantsDTO = new ArrayList<>();

		for (RestaurantStaff restaurantStaff : restaurantStaffList) {
			restaurantsDTO.add(convertToDTO(restaurantStaff.getRestaurant()));
		}

		return restaurantsDTO;
	}

	@Override
	public RestaurantStaff addStaffToRestaurant(Long restaurantId, Long staffId) {
		OurUser user = userRepository.findByIdAndRole(staffId, Roles.STAFF)
				.orElseThrow(() -> new ResourceNotFoundException(
						"El usuario no ha sido encontrado, o no tiene los permisos necesarios."));

		Restaurant restaurant = restaurantRepository.findById(restaurantId)
				.orElseThrow(() -> new ResourceNotFoundException("El restaurante no ha sido encontrado."));

		if (restaurantStaffRepository.existsByStaffAndRestaurant(user, restaurant)) {
			throw new DuplicateResourceException("El staff ya está asignado a este restaurante.");
		}

		RestaurantStaff restaurantStaff = new RestaurantStaff();
		restaurantStaff.setStaff(user);
		restaurantStaff.setRestaurant(restaurant);
		restaurantStaff.setAssignedAt(LocalDateTime.now());

		restaurantStaffRepository.save(restaurantStaff);

		return restaurantStaff;
	}

	@Override
	public void deleteRestaurantStaff(Long id) {
		if (!restaurantStaffRepository.existsById(id)) {
			throw new ResourceNotFoundException("RestaurantStaff no encontrado con ID: " + id);
		}
		restaurantStaffRepository.deleteById(id);
	}

	private RestaurantDTO convertToDTO(Restaurant restaurant) {
		return RestaurantDTO.builder().id(restaurant.getId()).name(restaurant.getName())
				.description(restaurant.getDescription()).address(restaurant.getAddress()).email(restaurant.getEmail())
				.phone(restaurant.getPhone()).openingHours(restaurant.getOpeningHours())
				.creationDate(restaurant.getCreationDate()).lastModifiedDate(restaurant.getLastModifiedDate()).build();
	}

}
