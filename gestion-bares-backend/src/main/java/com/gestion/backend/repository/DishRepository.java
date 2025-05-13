package com.gestion.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion.backend.entity.Dish;

public interface DishRepository extends JpaRepository<Dish, Long> {

}
