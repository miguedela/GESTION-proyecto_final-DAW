package com.gestion.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion.backend.entity.OurUser;

public interface UserRepository extends JpaRepository<OurUser, Long> {
	Optional<OurUser> findByEmail(String email);

	Optional<OurUser> findByTelephone(String telephone);

	int countByRole(String role);
}
