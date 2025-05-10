package com.gestion.backend.service;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gestion.backend.dto.RestaurantDTO;

public interface RestaurantService {

	public Page<RestaurantDTO> getRestaurants(Pageable pageable, Map<String, String> filters);

	public RestaurantDTO getRestaurantById(Long id);

	public RestaurantDTO createRestaurant(RestaurantDTO restaurantDTO);

	public RestaurantDTO updateRestaurant(RestaurantDTO restaurantDTO);

	public void deleteRestaurant(Long id);

}
