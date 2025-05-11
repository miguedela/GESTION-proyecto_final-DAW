package com.gestion.backend.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gestion.backend.dto.AuthResponseDTO;
import com.gestion.backend.dto.RegisterDTO;
import com.gestion.backend.dto.UserDTO;
import com.gestion.backend.entity.OurUser;
import com.gestion.backend.enums.Roles;
import com.gestion.backend.exception.DuplicateResourceException;
import com.gestion.backend.exception.InvalidCredentialsException;
import com.gestion.backend.exception.ResourceNotFoundException;
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

		if (userRepository.findByEmail(registrationRequest.getEmail()).isPresent())
			throw new DuplicateResourceException("El email ya está registrado");
		if (userRepository.findByTelephone(registrationRequest.getTelephone()).isPresent())
			throw new DuplicateResourceException("El número de teléfono ya está registrado");

		OurUser user = new OurUser();
		user.setName(registrationRequest.getName());
		user.setSurnames(registrationRequest.getSurnames());
		user.setEmail(registrationRequest.getEmail());
		user.setTelephone(registrationRequest.getTelephone());
		user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
		user.setCreationDate(LocalDateTime.now());
		user.setLastModifiedDate(LocalDateTime.now());
		user.setRole(registrationRequest.getRole() != null ? registrationRequest.getRole() : Roles.CUSTOMER);

		userRepository.save(user);

		UserDTO userDTO = new UserDTO();
		userDTO.setId(user.getId());
		userDTO.setName(user.getName());
		userDTO.setSurnames(user.getSurnames());
		userDTO.setTelephone(user.getTelephone());
		userDTO.setEmail(user.getEmail());
		userDTO.setRole(user.getRole().name());
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
					.orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

			UserDTO userDTO = new UserDTO();
			userDTO.setId(user.getId());
			userDTO.setName(user.getName());
			userDTO.setSurnames(user.getSurnames());
			userDTO.setTelephone(user.getTelephone());
			userDTO.setEmail(user.getEmail());
			userDTO.setRole(user.getRole().name());
			userDTO.setCreationDate(user.getCreationDate());

			String jwt = jwtUtils.generateToken(user);
			String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

			return AuthResponseDTO.builder().statusCode(200).message("Inicio de sesión exitoso").token(jwt)
					.refreshToken(refreshToken).user(userDTO).build();
		} catch (BadCredentialsException e) {
			throw new InvalidCredentialsException("Credenciales incorrectas");
		}
	}

	@Override
	public AuthResponseDTO updateMyData(UserDTO userDTO, String currentPassword) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String loggedInUserEmail = authentication.getName();

		Optional<OurUser> existingUserOpt = userRepository.findByEmail(userDTO.getEmail());
		if (existingUserOpt.isPresent() && !existingUserOpt.get().getId().equals(userDTO.getId()))
			throw new DuplicateResourceException("El email ya está registrado");

		Optional<OurUser> existingUserByPhone = userRepository.findByTelephone(userDTO.getTelephone());
		if (existingUserByPhone.isPresent() && !existingUserByPhone.get().getId().equals(userDTO.getId()))
			throw new DuplicateResourceException("El número de teléfono ya está registrado");

		OurUser user = userRepository.findByEmail(loggedInUserEmail)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con email: " + loggedInUserEmail));

		if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
			throw new InvalidCredentialsException("La contraseña actual es incorrecta.");
		}

		if (userDTO.getName() != null)
			user.setName(userDTO.getName());
		if (userDTO.getSurnames() != null)
			user.setSurnames(userDTO.getSurnames());
		if (userDTO.getTelephone() != null)
			user.setTelephone(userDTO.getTelephone());

		if (userDTO.getEmail() != null && !userDTO.getEmail().equals(user.getEmail())) {
			if (userRepository.existsByEmail(userDTO.getEmail())) {
				throw new DuplicateResourceException("El nuevo email ya esta en uso.");
			}
			user.setEmail(userDTO.getEmail());
		}

		user.setLastModifiedDate(LocalDateTime.now());

		OurUser updatedUser = userRepository.save(user);

		UserDTO updatedUserDTO = new UserDTO();
		updatedUserDTO.setName(updatedUser.getName());
		updatedUserDTO.setSurnames(updatedUser.getSurnames());
		updatedUserDTO.setTelephone(updatedUser.getTelephone());
		updatedUserDTO.setEmail(updatedUser.getEmail());
		updatedUserDTO.setRole(updatedUser.getRole().name());
		updatedUserDTO.setCreationDate(updatedUser.getCreationDate());
		updatedUserDTO.setLastModifiedDate(updatedUser.getLastModifiedDate());

		String token = jwtUtils.generateToken(updatedUser);
		String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), updatedUser);

		return AuthResponseDTO.builder().statusCode(200).message("Datos actualizados exitosamente").token(token)
				.refreshToken(refreshToken).user(updatedUserDTO).build();
	}
}
