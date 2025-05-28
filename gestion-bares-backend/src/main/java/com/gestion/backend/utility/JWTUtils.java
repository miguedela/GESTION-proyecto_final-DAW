package com.gestion.backend.utility;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;

@Component
public class JWTUtils {

	private SecretKey key;
	private static final long EXPIRATION_TIME = 10800000; // 3 hours

	@Value("${jwt.secret}")
	private String secret;

	@PostConstruct
	public void init() {
		byte[] decodedKey = Base64.getDecoder().decode(secret);
		this.key = new SecretKeySpec(decodedKey, 0, decodedKey.length, "HmacSHA256");

	}

	public String generateToken(UserDetails userDetails) {
		return Jwts.builder().subject(userDetails.getUsername()).issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)).signWith(key).compact();
	}

	public String generateRefreshToken(HashMap<String, Object> claims, UserDetails userDetails) {
		return Jwts.builder().claims(claims).subject(userDetails.getUsername())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)).signWith(key).compact();
	}

	public String generateResetPasswordToken(String email) {
		long expiration = 1000 * 60 * 15;

		HashMap<String, Object> claims = new HashMap<>();
		claims.put("token_type", "reset_password");

		return Jwts.builder().claims(claims).subject(email).issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + expiration)).signWith(key).compact();
	}

	public String extractUsername(String token) {
		return extractClaims(token, Claims::getSubject);
	}

	private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {
		return claimsTFunction.apply(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());
	}

	public boolean isTokenValid(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}

	public boolean isTokenExpired(String token) {
		return extractClaims(token, Claims::getExpiration).before(new Date());
	}

	public boolean validateResetPasswordToken(String token) {
		try {
			if (isTokenExpired(token))
				return false;
			String type = extractClaims(token, claims -> (String) claims.get("token_type"));
			return "reset_password".equals(type);
		} catch (Exception e) {
			return false;
		}
	}
}
