package com.gestion.backend.service.impl;

import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.gestion.backend.dto.DishDTO;
import com.gestion.backend.dto.MenuDTO;
import com.gestion.backend.entity.Menu;
import com.gestion.backend.entity.Restaurant;
import com.gestion.backend.exception.ResourceNotFoundException;
import com.gestion.backend.repository.RestaurantRepository;
import com.gestion.backend.service.MenuService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MenuServiceImpl implements MenuService {

	private final RestaurantRepository restaurantRepository;

	@Override
	public MenuDTO findMenuByRestaurantId(Long restaurantId) {
		Restaurant restaurant = restaurantRepository.findById(restaurantId)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurante no econtrado con ID: " + restaurantId));

		if (restaurant.getMenu() == null) {
			throw new RuntimeException("Menu del restaurante no econtrado.");
		}

		return convertToDTO(restaurant.getMenu());
	}

	@Override
	public MenuDTO updateMenu(Long restaurantId, MenuDTO menuDTO) {
		Restaurant restaurant = restaurantRepository.findById(restaurantId)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurante no econtrado con ID: " + restaurantId));

		Menu menu = restaurant.getMenu();
		if (menu == null) {
			throw new RuntimeException("Menu del restaurante no econtrado.");
		}

		// FIXME: actualizar el menu

		return convertToDTO(menu);
	}

	private MenuDTO convertToDTO(Menu menu) {
		MenuDTO menuDTO = new MenuDTO();
		menuDTO.setId(menu.getId());
		menuDTO.setDishes(menu.getDishes().stream().map(dish -> {
			DishDTO d = new DishDTO();
			d.setId(dish.getId());
			d.setName(dish.getName());
			d.setDescription(dish.getDescription());
			d.setPrice(dish.getPrice());
			d.setAvailable(dish.getAvailable());
			return d;
		}).collect(Collectors.toList()));

		return menuDTO;
	}

}
