package com.gestion.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.backend.dto.RestaurantDTO;
import com.gestion.backend.entity.relation.RestaurantStaff;
import com.gestion.backend.service.RestaurantStaffService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/restaurants-staff")
@AllArgsConstructor
public class RestaurantStaffController {

	private RestaurantStaffService restaurantStaffService;

	@PostMapping
	public ResponseEntity<RestaurantStaff> createRestaurantStaff(@RequestParam Long restaurantId,
			@RequestParam Long staffId) {
		RestaurantStaff resturantStaff = restaurantStaffService.addStaffToRestaurant(restaurantId, staffId);
		return new ResponseEntity<>(resturantStaff, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<RestaurantStaff> deleteRestaurantStaff(@PathVariable Long id) {
		restaurantStaffService.deleteRestaurantStaff(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/all")
	public ResponseEntity<List<RestaurantDTO>> getRestaurantsStaff() {
		List<RestaurantDTO> restaurantStaffList = restaurantStaffService.getRestaurantsStaff();
		return new ResponseEntity<>(restaurantStaffList, HttpStatus.OK);
	}

	@GetMapping("/staff/{staffId}")
	public ResponseEntity<List<RestaurantDTO>> getRestaurantsByStaff(@PathVariable Long staffId) {
		List<RestaurantDTO> restaurantStaffList = restaurantStaffService.getRestaurantsByStaff(staffId);
		return new ResponseEntity<>(restaurantStaffList, HttpStatus.OK);
	}

	@GetMapping("/restaurant/{restaurantId}")
	public ResponseEntity<List<RestaurantDTO>> getStaffByRestaurant(@PathVariable Long restaurantId) {
		List<RestaurantDTO> restaurantStaffList = restaurantStaffService.getStaffByRestaurant(restaurantId);
		return new ResponseEntity<>(restaurantStaffList, HttpStatus.OK);
	}
}
