package com.gestion.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO {
	private String name;
	private String surnames;
	private String email;
	private String telephone;
	private String password;
	private String emailNotifications;
}
