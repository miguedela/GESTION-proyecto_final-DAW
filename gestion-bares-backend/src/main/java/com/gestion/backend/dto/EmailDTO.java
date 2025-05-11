package com.gestion.backend.dto;

import java.util.Map;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmailDTO {

	private String to;
	private String subject;
	private String templateName;
	private Map<String, Object> variables;

}
