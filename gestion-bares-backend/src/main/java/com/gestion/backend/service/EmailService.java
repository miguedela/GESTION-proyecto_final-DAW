package com.gestion.backend.service;

import org.springframework.mail.javamail.MimeMessageHelper;

import com.gestion.backend.dto.EmailDTO;

public interface EmailService {

	public MimeMessageHelper sendEmail(EmailDTO emailDTO);

	// No funcional por ahora
//	public void sendEmailWithATttachment(EmailDTO emailDTO);

	void sendResetPasswordEmail(String emailTo);
	
	void sendContactEmail(String userEmail, String subject, String message);
	
}
