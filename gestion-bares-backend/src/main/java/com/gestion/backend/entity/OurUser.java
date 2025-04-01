package com.gestion.backend.entity;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "users")
public class OurUser implements UserDetails {

	private static final long serialVersionUID = -7378905965865916888L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "surnames", nullable = false)
	private String surnames;

	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@Column(name = "telephone", nullable = false, unique = true)
	private String telephone;

	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "role", nullable = false, columnDefinition = "varchar(20) default 'USER'")
	private String role;

	@Column(name = "email_verified", nullable = false, columnDefinition = "boolean default false")
	private boolean emailVerified;

	@Column(name = "email_notifications", nullable = false, columnDefinition = "boolean default false")
	private boolean emailNotifications;

	@CreatedDate
	@Column(name = "creation_date")
	private LocalDateTime creationDate;

	@Override
	@JsonIgnore
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role));
	}

	@Override
	@JsonIgnore
	public String getUsername() {
		return email;
	}

	@Override
	@JsonIgnore
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	@JsonIgnore
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	@JsonIgnore
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	@JsonIgnore
	public boolean isEnabled() {
		return true;
	}
}
