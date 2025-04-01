package com.gestion.backend.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gestion.backend.dto.AuthResponseDTO;
import com.gestion.backend.dto.RegisterDTO;
import com.gestion.backend.dto.UserDTO;
import com.gestion.backend.entity.OurUser;
import com.gestion.backend.exception.DuplicateResourceException;
import com.gestion.backend.exception.InvalidCredentialsException;
import com.gestion.backend.exception.UserNotFoundException;
import com.gestion.backend.repository.UserRepository;
import com.gestion.backend.service.AuthService;
import com.gestion.backend.utility.JWTUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final UserRepository userRepository;
	private final JWTUtils jwtUtils;
	private final AuthenticationManager authenticationManager;
	private final PasswordEncoder passwordEncoder;

	@Override
	public AuthResponseDTO register(RegisterDTO registrationRequest) {

		if (userRepository.findByEmail(registrationRequest.getEmail()).isPresent()) {
			throw new DuplicateResourceException("Una cuenta ya usa este email.");
		}

		OurUser user = new OurUser();
		user.setName(registrationRequest.getName());
		user.setSurnames(registrationRequest.getSurnames());
		user.setEmail(registrationRequest.getEmail());
		user.setTelephone(registrationRequest.getTelephone());
		user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
		user.setRole("USER");
		user.setCreationDate(LocalDateTime.now());

		userRepository.save(user);

		UserDTO userDTO = new UserDTO();
		userDTO.setName(user.getName());
		userDTO.setSurnames(user.getSurnames());
		userDTO.setEmail(user.getEmail());
		userDTO.setTelephone(user.getTelephone());
		userDTO.setRole(user.getRole());
		userDTO.setEmailVerified(user.isEmailVerified());
		userDTO.setEmailNotifications(user.isEmailNotifications());
		userDTO.setCreationDate(user.getCreationDate());

		String token = jwtUtils.generateToken(user);
		String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

		return AuthResponseDTO.builder().statusCode(201).message("Usuario registrado exitosamente").token(token)
				.refreshToken(refreshToken).user(userDTO).build();
	}

	@Override
	public AuthResponseDTO login(String email, String password) {
		try {

			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
			OurUser user = userRepository.findByEmail(email)
					.orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

			UserDTO userDTO = new UserDTO();
			userDTO.setName(user.getName());
			userDTO.setSurnames(user.getSurnames());
			userDTO.setEmail(user.getEmail());
			userDTO.setTelephone(user.getTelephone());
			userDTO.setRole(user.getRole());
			userDTO.setEmailVerified(user.isEmailVerified());
			userDTO.setEmailNotifications(user.isEmailNotifications());
			userDTO.setCreationDate(user.getCreationDate());

			String token = jwtUtils.generateToken(user);
			String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

			return AuthResponseDTO.builder().statusCode(201).message("Inicio de sesión exitoso").token(token)
					.refreshToken(refreshToken).user(userDTO).build();

		} catch (Exception e) {
			throw new InvalidCredentialsException("Credenciales incorrectas");
		}
	}

}
