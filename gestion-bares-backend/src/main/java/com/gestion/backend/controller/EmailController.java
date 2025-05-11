package com.gestion.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.backend.dto.EmailDTO;
import com.gestion.backend.service.EmailService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
public class EmailController {

	private final EmailService emailService;

	@PostMapping
	public ResponseEntity<String> sendEmail(@RequestBody EmailDTO email) {
		emailService.sendEmail(email);
		return new ResponseEntity<>("Correo enviado correctamente", HttpStatus.OK);
	}
}
