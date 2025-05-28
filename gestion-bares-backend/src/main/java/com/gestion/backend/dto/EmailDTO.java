package com.gestion.backend.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmailDTO {

	private String to;
	private String subject;
	private String templateName;
	private Map<String, Object> variables;

}
