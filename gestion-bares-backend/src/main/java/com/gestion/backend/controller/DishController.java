package com.gestion.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.backend.dto.DishDTO;
import com.gestion.backend.service.DishService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/dishes")
@AllArgsConstructor
public class DishController {

	private final DishService dishService;

	@PostMapping("/{menuId}")
	public ResponseEntity<DishDTO> createDish(@PathVariable Long menuId, @RequestBody DishDTO dishDTO) {
		DishDTO createDishDTO = dishService.createDish(menuId, dishDTO);
		return new ResponseEntity<>(createDishDTO, HttpStatus.OK);
	}

	@PutMapping
	public ResponseEntity<DishDTO> updateDish(@RequestBody DishDTO dishDTO) {
		DishDTO updateDishDTO = dishService.updateDish(dishDTO);
		return new ResponseEntity<>(updateDishDTO, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<DishDTO> deleteDish(@PathVariable Long id) {
		dishService.deleteDish(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/{id}")
	public ResponseEntity<DishDTO> getDishByID(@PathVariable Long id) {
		DishDTO dishDTO = dishService.getDishById(id);
		return new ResponseEntity<>(dishDTO, HttpStatus.OK);
	}

}
