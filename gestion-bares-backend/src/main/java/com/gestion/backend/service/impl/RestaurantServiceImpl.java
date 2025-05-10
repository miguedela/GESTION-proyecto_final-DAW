package com.gestion.backend.service.impl;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.gestion.backend.dto.RestaurantDTO;
import com.gestion.backend.entity.Restaurant;
import com.gestion.backend.exception.DuplicateResourceException;
import com.gestion.backend.repository.RestaurantRepository;
import com.gestion.backend.service.RestaurantService;
import com.gestion.backend.specification.RestaurantSpecifications;
import com.gestion.backend.utility.SpecificationBuilder;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

	private final RestaurantRepository restaurantRepository;

	@Override
	public Page<RestaurantDTO> getRestaurants(Pageable pageable, Map<String, String> filters) {
		SpecificationBuilder<Restaurant> builder = new SpecificationBuilder<Restaurant>().with("general",
				key -> RestaurantSpecifications.filterByGeneral(filters));

		Specification<Restaurant> spec = builder.build(filters);

		return restaurantRepository.findAll(spec, pageable).map(this::convertToDTO);
	}

	@Override
	public RestaurantDTO getRestaurantById(Long id) {
		return restaurantRepository.findById(id).map(this::convertToDTO)
				.orElseThrow(() -> new RuntimeException("Restaurante no econtrado con ID: " + id));
	}

	@Override
	public RestaurantDTO createRestaurant(RestaurantDTO registrationRequest) {

		if (restaurantRepository.findByName(registrationRequest.getName()).isPresent())
			throw new DuplicateResourceException("Hay un restaurante con el mismo nombre");
		
		if (restaurantRepository.findByEmail(registrationRequest.getEmail()).isPresent())
			throw new DuplicateResourceException("Un restaurante ya usa este email");
		
		if (restaurantRepository.findByPhone(registrationRequest.getPhone()).isPresent())
			throw new DuplicateResourceException("Un restaurante ya usa este número de teléfono");

		Restaurant restaurant = new Restaurant();
		restaurant.setId(registrationRequest.getId());
		restaurant.setName(registrationRequest.getName());
		restaurant.setDescription(registrationRequest.getDescription());
		restaurant.setAddress(registrationRequest.getAddress());
		restaurant.setEmail(registrationRequest.getEmail());
		restaurant.setPhone(registrationRequest.getPhone());
		restaurant.setOpeningHours(registrationRequest.getOpeningHours());
		restaurant.setCreationDate(LocalDateTime.now());
		restaurant.setLastModifiedDate(LocalDateTime.now());

		Restaurant savedRestaurant = restaurantRepository.save(restaurant);

		return convertToDTO(savedRestaurant);
	}

	@Override
	public RestaurantDTO updateRestaurant(RestaurantDTO updateRequest) {
		Restaurant restaurant = restaurantRepository.findById(updateRequest.getId())
				.orElseThrow(() -> new RuntimeException("Restaurante no econtrado con ID: " + updateRequest.getId()));

		restaurant.setName(updateRequest.getName());
		restaurant.setDescription(updateRequest.getDescription());
		restaurant.setAddress(updateRequest.getAddress());
		restaurant.setEmail(updateRequest.getEmail());
		restaurant.setPhone(updateRequest.getPhone());
		restaurant.setOpeningHours(updateRequest.getOpeningHours());
		restaurant.setLastModifiedDate(LocalDateTime.now());

		return convertToDTO(restaurant);
	}

	@Override
	public void deleteRestaurant(Long id) {
		if (!restaurantRepository.existsById(id)) {
			throw new RuntimeException("Restaurant no encontrado con ID: " + id);
		}
		restaurantRepository.deleteById(id);
	}

	private RestaurantDTO convertToDTO(Restaurant restaurant) {
		return RestaurantDTO.builder().id(restaurant.getId()).name(restaurant.getName())
				.description(restaurant.getDescription()).address(restaurant.getAddress()).email(restaurant.getEmail())
				.phone(restaurant.getPhone()).openingHours(restaurant.getOpeningHours())
				.creationDate(restaurant.getCreationDate()).lastModifiedDate(restaurant.getLastModifiedDate()).build();
	}

}
