package com.gestion.backend.service;

import com.gestion.backend.dto.RestaurantStaffDTO;

public interface RestaurantStaffService {

	public RestaurantStaffDTO createRestaurantStaff(RestaurantStaffDTO restaurantStaffDTO);

	public void deleteRestaurantStaff(Long id);

}
