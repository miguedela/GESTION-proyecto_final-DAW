package com.gestion.backend.exception;

public class DuplicateResourceException extends RuntimeException {
   
	private static final long serialVersionUID = 8935393604319702437L;

	public DuplicateResourceException(String message) {
        super(message);
    }
}
