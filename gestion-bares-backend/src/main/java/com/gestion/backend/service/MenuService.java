package com.gestion.backend.service;

import com.gestion.backend.dto.MenuDTO;

public interface MenuService {

	public MenuDTO findMenuByRestaurantId(Long restaurantId);

	public MenuDTO updateMenu(Long restaurantId, MenuDTO menuDTO);

}
