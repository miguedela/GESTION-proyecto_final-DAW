package com.gestion.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.backend.dto.EmailDTO;
import com.gestion.backend.service.EmailService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
public class EmailController {

	private final EmailService emailService;

	@GetMapping
	public ResponseEntity<String> sendEmail(@RequestBody EmailDTO email) {
		emailService.sendEmail(email);
		return ResponseEntity.ok("Correo enviado correctamente");
	}

	@GetMapping("/reset-password")
	public ResponseEntity<String> sendResetPasswordEmail(@RequestParam String emailTo) {
		try {
			emailService.sendResetPasswordEmail(emailTo);
			return ResponseEntity.ok("Correo enviado correctamente");
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body("Error al procesar el correo electrónico");
		}
	}

	@PostMapping("/contact")
	public ResponseEntity<String> sendContactEmail(@RequestParam String userEmail, @RequestParam String subject,
			@RequestParam String message) {
		emailService.sendContactEmail(userEmail, subject, message);
		return ResponseEntity.ok("Correo procesado correctamente");
	}
}
