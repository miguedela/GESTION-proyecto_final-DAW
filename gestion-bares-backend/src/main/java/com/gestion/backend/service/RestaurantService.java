package com.gestion.backend.service;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gestion.backend.dto.RestaurantDTO;
import com.gestion.backend.dto.UserDTO;

public interface RestaurantService {

	public RestaurantDTO updateRestaurant(RestaurantDTO restaurantDTO, UserDTO userDTO);

	public RestaurantDTO createRestaurant(RestaurantDTO restaurantDTO);

	public void deleteRestaurant(Long id);
	
	public Page<RestaurantDTO> getRestaurants(Pageable pageable, Map<String, String> filters);

	public RestaurantDTO getRestaurantById(Long id);


}
