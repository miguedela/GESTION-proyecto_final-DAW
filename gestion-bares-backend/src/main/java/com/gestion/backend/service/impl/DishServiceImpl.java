package com.gestion.backend.service.impl;

import org.springframework.stereotype.Service;

import com.gestion.backend.dto.DishDTO;
import com.gestion.backend.entity.Dish;
import com.gestion.backend.entity.Menu;
import com.gestion.backend.exception.ResourceNotFoundException;
import com.gestion.backend.repository.DishRepository;
import com.gestion.backend.repository.MenuRepository;
import com.gestion.backend.service.DishService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DishServiceImpl implements DishService {

	private final MenuRepository menuRepository;
	private final DishRepository dishRepository;

	@Override
	public DishDTO createDish(Long menuId, DishDTO createRequest) {
		Menu menu = menuRepository.findById(menuId)
				.orElseThrow(() -> new ResourceNotFoundException("Menu no econtrado con ID: " + menuId));

		Dish dish = new Dish();
		dish.setName(createRequest.getName());
		dish.setDescription(createRequest.getDescription());
		dish.setPrice(createRequest.getPrice());
		dish.setAvailable(createRequest.getAvailable());
		dish.setMenu(menu);

		return convertToDTO(dishRepository.save(dish));
	}

	@Override
	public DishDTO updateDish(DishDTO updateRequest) {
		Dish dish = dishRepository.findById(updateRequest.getId()).orElseThrow(
				() -> new ResourceNotFoundException("Plato no econtrado con ID: " + updateRequest.getId()));

		dish.setName(updateRequest.getName());
		dish.setDescription(updateRequest.getDescription());
		dish.setPrice(updateRequest.getPrice());
		dish.setAvailable(updateRequest.getAvailable());

		return convertToDTO(dishRepository.save(dish));
	}

	@Override
	public void deleteDish(Long dishId) {
		if (!dishRepository.existsById(dishId)) {
			throw new ResourceNotFoundException("Plato no encontrado con ID: " + dishId);
		}

		dishRepository.deleteById(dishId);
	}

	private DishDTO convertToDTO(Dish dish) {
		DishDTO d = new DishDTO();
		d.setId(dish.getId());
		d.setName(dish.getName());
		d.setDescription(dish.getDescription());
		d.setAvailable(dish.getAvailable());
		return d;
	}

}
