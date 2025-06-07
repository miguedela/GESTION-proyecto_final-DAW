package com.gestion.backend.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.gestion.backend.dto.RestaurantDTO;
import com.gestion.backend.dto.RestaurantStaffDTO;
import com.gestion.backend.dto.UserDTO;
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

	@Override
	public List<RestaurantDTO> getRestaurantsByStaff(Long staffId) {
		Streamable<RestaurantStaff> restaurantStaffList = restaurantStaffRepository.findAllByStaffId(staffId);
		if (restaurantStaffList.isEmpty()) {
			throw new ResourceNotFoundException("Este usuario no tiene restaurantes.");
		}
		List<RestaurantDTO> restaurantsDTO = new ArrayList<>();

		for (RestaurantStaff restaurantStaff : restaurantStaffList) {
			restaurantsDTO.add(convertToDTO(restaurantStaff.getRestaurant()));
		}

		return restaurantsDTO;
	}

	@Override
	public List<RestaurantDTO> getStaffByRestaurant(Long restaurantId) {
		Streamable<RestaurantStaff> restaurantStaffList = restaurantStaffRepository.findAllByRestaurantId(restaurantId);
		if (restaurantStaffList.isEmpty()) {
			throw new ResourceNotFoundException("No se han encontrado asignaciones.");
		}
		List<RestaurantDTO> restaurantsDTO = new ArrayList<>();

		for (RestaurantStaff restaurantStaff : restaurantStaffList) {
			restaurantsDTO.add(convertToDTO(restaurantStaff.getRestaurant()));
		}

		return restaurantsDTO;
	}

	@Override
	public List<RestaurantStaffDTO> getRestaurantsStaff() {
		List<RestaurantStaff> restaurantStaffList = restaurantStaffRepository.findAll();
		if (restaurantStaffList.isEmpty()) {
			throw new ResourceNotFoundException("No hay relaciones staff-restaurante.");
		}
		List<RestaurantStaffDTO> dtos = new ArrayList<>();
		for (RestaurantStaff rs : restaurantStaffList) {
			dtos.add(convertToRestaurantStaffDTO(rs));
		}
		return dtos;
	}

	private RestaurantDTO convertToDTO(Restaurant restaurant) {
		return RestaurantDTO.builder().id(restaurant.getId()).name(restaurant.getName())
				.description(restaurant.getDescription()).address(restaurant.getAddress()).email(restaurant.getEmail())
				.phone(restaurant.getPhone()).openingHours(restaurant.getOpeningHours())
				.creationDate(restaurant.getCreationDate()).lastModifiedDate(restaurant.getLastModifiedDate()).build();
	}

	private UserDTO convertToUserDTO(OurUser user) {
		UserDTO dto = new UserDTO();
		dto.setName(user.getName());
		dto.setSurnames(user.getSurnames());
		dto.setTelephone(user.getTelephone());
		dto.setEmail(user.getEmail());
		dto.setRole(user.getRole().name());
		dto.setCreationDate(user.getCreationDate());
		dto.setLastModifiedDate(user.getLastModifiedDate());
		return dto;
	}

	private RestaurantStaffDTO convertToRestaurantStaffDTO(RestaurantStaff rs) {
		RestaurantStaffDTO dto = new RestaurantStaffDTO();
		dto.setId(rs.getId());
		dto.setRestaurant(convertToDTO(rs.getRestaurant()));
		dto.setStaff(convertToUserDTO(rs.getStaff()));
		dto.setAssignedAt(rs.getAssignedAt());
		return dto;
	}
}
