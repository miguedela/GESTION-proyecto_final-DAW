package com.gestion.backend.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.gestion.backend.entity.Menu;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class RestaurantDTO {

	private Long id;
	private String name;
	private String description;
	private String address;
	private String email;
	private String phone;
	private String openingHours;
	private LocalDateTime creationDate;
	private LocalDateTime lastModifiedDate;
	private Menu menu;
	private int customer_ammount;

}