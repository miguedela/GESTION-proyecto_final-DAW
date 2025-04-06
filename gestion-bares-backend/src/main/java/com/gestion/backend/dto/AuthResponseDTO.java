package com.gestion.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthResponseDTO {
	
    private int statusCode;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private UserDTO user;
    
}
