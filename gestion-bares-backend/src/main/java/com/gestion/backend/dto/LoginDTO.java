package com.gestion.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
	private String email;
	private String telephone; // En un futuro implementar login con teléfono
	private String password;
}
