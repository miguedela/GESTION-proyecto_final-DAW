package com.gestion.backend.service;

import com.gestion.backend.dto.AuthResponseDTO;
import com.gestion.backend.dto.RegisterDTO;

public interface AuthService {
	public AuthResponseDTO register(RegisterDTO registrationRequest);

	public AuthResponseDTO login(String email, String password);
}
