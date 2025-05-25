package com.gestion.backend.service;

import com.gestion.backend.dto.DishDTO;

public interface DishService {

	public DishDTO createDish(Long menuId, DishDTO dishDTO);

	public DishDTO updateDish(DishDTO dishDTO);

	public void deleteDish(Long dishId);

	public DishDTO getDishById(Long dishId);

}
