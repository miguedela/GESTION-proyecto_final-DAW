package com.gestion.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.gestion.backend.entity.relation.RestaurantStaff;

public interface RestaurantStaffRepository
		extends JpaRepository<RestaurantStaff, Long>, JpaSpecificationExecutor<RestaurantStaff> {

	Optional<RestaurantStaff> findById(Long id);

	Optional<RestaurantStaff> findByRestaurantId(Long id);

	Optional<RestaurantStaff> findByStaffId(Long id);

}
