package com.gestion.backend.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "restaurants")
public class Restaurant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name", nullable = false, unique = true)
	private String name;

	@Column(name = "description", nullable = true)
	private String description;

	@Column(name = "address", nullable = true)
	private String address;

	@Column(name = "email", nullable = false, unique = false)
	private String email;

	@Column(name = "phone", nullable = false, unique = false)
	private String phone;

	@Column(name = "opening_hours", nullable = true)
	private String openingHours;

	@CreatedDate
	@Column(name = "creation_date")
	private LocalDateTime creationDate;

	@LastModifiedDate
	@Column(name = "last_modified_date")
	private LocalDateTime lastModifiedDate;

	@OneToOne(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = false)
	private Menu menu;

	@Column(name = "customer_amount", nullable = false)
	private int customerAmount;

}
