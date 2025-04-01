package com.gestion.backend.exception;

public class InvalidCredentialsException extends RuntimeException {

	private static final long serialVersionUID = -7534645340899097696L;

	public InvalidCredentialsException(String message) {
		super(message);
	}
}