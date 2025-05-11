package com.gestion.backend.service;

import com.gestion.backend.entity.relation.RestaurantStaff;

public interface RestaurantStaffService {

	public RestaurantStaff addStaffToRestaurant(Long restaurantId, Long staffId);

	public void deleteRestaurantStaff(Long id);

}
