package com.gestion.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.gestion.backend.entity.OurUser;
import com.gestion.backend.enums.Roles;

public interface UserRepository extends JpaRepository<OurUser, Long>, JpaSpecificationExecutor<OurUser> {
	
	Optional<OurUser> findByEmail(String email);
	
	Optional<OurUser> findByTelephone(String telephone);

	int countByRole(Roles admin);
}
