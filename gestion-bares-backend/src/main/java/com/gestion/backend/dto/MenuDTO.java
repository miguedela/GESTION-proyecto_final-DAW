package com.gestion.backend.dto;

import java.util.List;

import lombok.Data;

@Data
public class MenuDTO {

	Long id;
	List<DishDTO> dishes;

}
