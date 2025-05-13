package com.gestion.backend.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class DishDTO {

	private Long id;
	private String name;
	private String description;
	private BigDecimal price;
	private Boolean available;

}
