package com.gestion.backend.entity;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.gestion.backend.enums.NotificationStatus;

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
@Table(name = "notification")
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "sender_id", nullable = false)
	private Long senderId;

	@Column(name = "receiver_id", nullable = false)
	private Long receiverId;

	@Column(name = "reservation_id", nullable = true)
	private Long reservationId;

	@Column(name = "status", nullable = false)
	private NotificationStatus status;
}
