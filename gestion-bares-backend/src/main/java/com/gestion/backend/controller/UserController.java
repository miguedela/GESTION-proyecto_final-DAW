package com.gestion.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.backend.dto.AuthResponseDTO;
import com.gestion.backend.dto.LoginDTO;
import com.gestion.backend.dto.RegisterDTO;
import com.gestion.backend.dto.UserDTO;
import com.gestion.backend.service.AuthService;
import com.gestion.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

	private final AuthService authService;
	private final UserService userService;

	@GetMapping("/admin/all")
	public ResponseEntity<List<UserDTO>> getAllUsers() {
		return ResponseEntity.ok(userService.getAllUser());
	}

	@GetMapping("/admin/{userId}")
	public ResponseEntity<UserDTO> getUser(@PathVariable Long userId) {
		return ResponseEntity.ok(userService.getUserById(userId));
	}

	@GetMapping("/profile")
	public ResponseEntity<UserDTO> getMyProfile() {

		// Obtener el email del usuario autenticado
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();

		return ResponseEntity.ok(userService.getUserByEmail(email));
	}

	@PostMapping("/auth/register")
	public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterDTO reg) {
		return ResponseEntity.ok(authService.register(reg));
	}

	@PostMapping("/auth/login")
	public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO reg) {
		return ResponseEntity.ok(authService.login(reg.getEmail(), reg.getPassword()));
	}

	@DeleteMapping("/admin/{userId}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
		userService.deleteUser(userId);
		return ResponseEntity.noContent().build();
	}
}
