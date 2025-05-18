package com.gestion.backend.controller;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.backend.dto.RestaurantDTO;
import com.gestion.backend.service.RestaurantService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/restaurants")
@AllArgsConstructor
public class RestaurantController {

	private final RestaurantService restaurantService;

	@PostMapping
	public ResponseEntity<RestaurantDTO> createRestaurant(@RequestBody RestaurantDTO restaurantDTO) {
		RestaurantDTO resturant = restaurantService.createRestaurant(restaurantDTO);
		return new ResponseEntity<>(resturant, HttpStatus.OK);
	}

	@PutMapping("/{userId}")
	public ResponseEntity<RestaurantDTO> updateRestaurant(@PathVariable Long userId,
			@RequestBody RestaurantDTO restaurantDTO) {
		RestaurantDTO updateResturant = restaurantService.updateRestaurant(userId, restaurantDTO);
		return new ResponseEntity<>(updateResturant, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<RestaurantDTO> deleteRestaurant(@PathVariable Long id) {
		restaurantService.deleteRestaurant(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping
	public ResponseEntity<Page<RestaurantDTO>> getRestaurants(Pageable pageable,
			@RequestParam Map<String, String> filters) {
		Page<RestaurantDTO> restaurants = restaurantService.getRestaurants(pageable, filters);
		return new ResponseEntity<>(restaurants, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<RestaurantDTO> getRestaurantById(@PathVariable Long id) {
		RestaurantDTO restaurantDTO = restaurantService.getRestaurantById(id);
		return new ResponseEntity<>(restaurantDTO, HttpStatus.OK);
	}

}
