package com.gestion.backend.exception;

public class ResourceNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 5669740512129773260L;

	public ResourceNotFoundException(String message) {
		super(message);
	}
}
