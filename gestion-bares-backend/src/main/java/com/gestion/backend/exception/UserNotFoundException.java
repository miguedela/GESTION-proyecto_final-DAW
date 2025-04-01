package com.gestion.backend.exception;

public class UserNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 5669740512129773260L;

	public UserNotFoundException(String message) {
		super(message);
	}
}