package com.gestion.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {
	private int statusCode;
	private String message;
	private String token;
	private String refreshToken;
	private String expirationTime;
	private UserDTO user;
}
