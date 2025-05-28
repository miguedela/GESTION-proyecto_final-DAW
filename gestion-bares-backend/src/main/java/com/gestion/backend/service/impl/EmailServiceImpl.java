package com.gestion.backend.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.gestion.backend.dto.EmailDTO;
import com.gestion.backend.service.EmailService;
import com.gestion.backend.utility.JWTUtils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

	@Autowired
	private final JavaMailSender mailSender;

	@Autowired
	private final SpringTemplateEngine templateEngine;

	@Autowired
	private final JWTUtils jwtUtils;

	@Value("${spring.mail.username}")
	private String emailUsername;

	@Value("${url.frontend}")
	private String frontendUrl;

	@Override
	public MimeMessageHelper sendEmail(EmailDTO emailDTO) {
		return sendEmailInternal(emailDTO, false);
	}

//	@Override
//	public void sendEmailWithATttachment(EmailDTO emailDTO) {
//		sendEmailInternal(emailDTO, true);
//	}

	private MimeMessageHelper sendEmailInternal(EmailDTO emailDTO, boolean withAttachment) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			helper.setFrom(emailUsername);
			helper.setTo(emailDTO.getTo());
			helper.setSubject(emailDTO.getSubject());

			Context context = new Context();
			if (emailDTO.getVariables() != null) {
				context.setVariables(emailDTO.getVariables());
			}

			String htmlContext = templateEngine.process(emailDTO.getTemplateName(), context);
			helper.setText(htmlContext, true);

			if (withAttachment) {
				helper.addAttachment("name.png", new File("ruta"));
			}

			mailSender.send(message);
			return helper;
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public void sendResetPasswordEmail(String emailTo) {
		String token = jwtUtils.generateResetPasswordToken(emailTo);

		Map<String, Object> variables = new HashMap<>();
		variables.put("temporalUrl", frontendUrl + "/account/reset-password?token=" + token);

		EmailDTO emailDTO = new EmailDTO();
		emailDTO.setTo(emailTo);
		emailDTO.setSubject("Cambio de contraseña - TapaTech");
		emailDTO.setTemplateName("reset-password");
		emailDTO.setVariables(variables);

		sendEmail(emailDTO);
	}

}
