package com.gestion.backend.service.impl;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.gestion.backend.dto.RestaurantDTO;
import com.gestion.backend.dto.UserDTO;
import com.gestion.backend.entity.Menu;
import com.gestion.backend.entity.OurUser;
import com.gestion.backend.entity.Restaurant;
import com.gestion.backend.enums.Roles;
import com.gestion.backend.exception.DuplicateResourceException;
import com.gestion.backend.exception.ResourceNotFoundException;
import com.gestion.backend.repository.MenuRepository;
import com.gestion.backend.repository.RestaurantRepository;
import com.gestion.backend.repository.RestaurantStaffRepository;
import com.gestion.backend.service.RestaurantService;
import com.gestion.backend.service.RestaurantStaffService;
import com.gestion.backend.specification.RestaurantSpecifications;
import com.gestion.backend.utility.SpecificationBuilder;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

	private final RestaurantRepository restaurantRepository;
	private final RestaurantStaffRepository restaurantStaffRepository;
	private final MenuRepository menuRepository;

	private final RestaurantStaffService restaurantStaffService;

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

		Menu menu = new Menu();
		menu.setRestaurant(restaurant);
		menuRepository.save(menu);

		savedRestaurant.setMenu(menu);

		Restaurant updateRestaurant = restaurantRepository.save(savedRestaurant);

		return convertToDTO(updateRestaurant);
	}

	@Override
	public RestaurantDTO updateRestaurant(RestaurantDTO updateRequest, UserDTO userRequest) {
		Restaurant restaurant = restaurantRepository.findById(updateRequest.getId()).orElseThrow(
				() -> new ResourceNotFoundException("Restaurante no econtrado con ID: " + updateRequest.getId()));
		restaurant.setName(updateRequest.getName());
		restaurant.setDescription(updateRequest.getDescription());
		restaurant.setAddress(updateRequest.getAddress());
		restaurant.setEmail(updateRequest.getEmail());
		restaurant.setPhone(updateRequest.getPhone());
		restaurant.setOpeningHours(updateRequest.getOpeningHours());
		restaurant.setLastModifiedDate(LocalDateTime.now());

		OurUser user = new OurUser();
		user.setName(userRequest.getName());
		user.setSurnames(userRequest.getSurnames());
		user.setEmail(userRequest.getEmail());
		user.setTelephone(userRequest.getTelephone());
		user.setCreationDate(LocalDateTime.now());
		user.setLastModifiedDate(LocalDateTime.now());

		if (restaurantStaffRepository.existsByStaffAndRestaurant(user, restaurant)
				|| userRequest.getRole().equals(Roles.ADMIN)) {
			return convertToDTO(restaurantRepository.save(restaurant));
		} else {
			throw new ResourceNotFoundException("No hay relacion entre este staff: " + userRequest.getId()
					+ " y restaurante con id: " + updateRequest.getId());
		}

	}

	@Override
	public void deleteRestaurant(Long id) {
		if (!restaurantRepository.existsById(id)) {
			throw new RuntimeException("Restaurant no encontrado con ID: " + id);
		}

		if (restaurantStaffRepository.findByRestaurantId(id) != null) {
			restaurantStaffService.deleteRestaurantStaff(restaurantStaffRepository.findByRestaurantId(id).getId());
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
