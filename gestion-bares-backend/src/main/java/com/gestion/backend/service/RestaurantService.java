package com.gestion.backend.service;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gestion.backend.dto.RestaurantDTO;

public interface RestaurantService {

	public RestaurantDTO createRestaurant(RestaurantDTO restaurantDTO);

	public void deleteRestaurant(Long id);
	
	public RestaurantDTO updateRestaurant(Long userId, RestaurantDTO restaurantDTO);

	public Page<RestaurantDTO> getRestaurants(Pageable pageable, Map<String, String> filters);

	public RestaurantDTO getRestaurantById(Long id);

}
