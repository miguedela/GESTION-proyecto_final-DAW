package com.gestion.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.gestion.backend.entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long>, JpaSpecificationExecutor<Restaurant> {

	Optional<Restaurant> findByName(String name);

	Optional<Restaurant> findByEmail(String email);

	Optional<Restaurant> findByPhone(String phone);

}
