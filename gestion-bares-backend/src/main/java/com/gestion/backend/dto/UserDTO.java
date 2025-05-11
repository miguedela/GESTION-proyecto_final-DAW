package com.gestion.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

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
public class UserDTO {

	private Long id;
	private String name;
	private String surnames;
	private String email;
	private String telephone;
	private String role;
	private LocalDateTime creationDate;
	private LocalDateTime lastModifiedDate;
	private List<RestaurantDTO> restaurants;

}
