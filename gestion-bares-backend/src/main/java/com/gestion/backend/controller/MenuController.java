package com.gestion.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.backend.dto.MenuDTO;
import com.gestion.backend.service.MenuService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/menu")
@AllArgsConstructor
public class MenuController {

	private final MenuService menuService;

	@GetMapping("/{id}")
	public ResponseEntity<MenuDTO> getMenuById(@PathVariable Long id) {
		MenuDTO menuDTO = menuService.findMenuByRestaurantId(id);
		return new ResponseEntity<>(menuDTO, HttpStatus.OK);
	}

}
