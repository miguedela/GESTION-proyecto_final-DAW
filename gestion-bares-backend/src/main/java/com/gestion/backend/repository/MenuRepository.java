package com.gestion.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion.backend.entity.Dish;
import com.gestion.backend.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {

//	List<Dish> findByMenuId(Long menuId);

}
