package com.gestion.backend.service;

import java.util.List;

import com.gestion.backend.dto.RestaurantDTO;
import com.gestion.backend.entity.relation.RestaurantStaff;

public interface RestaurantStaffService {

	public RestaurantStaff addStaffToRestaurant(Long restaurantId, Long staffId);

	public void deleteRestaurantStaff(Long id);

	public List<RestaurantDTO> getRestaurantsByStaff(Long id);

}
