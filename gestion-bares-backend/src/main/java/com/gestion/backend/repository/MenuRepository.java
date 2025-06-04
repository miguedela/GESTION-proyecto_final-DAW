package com.gestion.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion.backend.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {

//	List<Dish> findByMenuId(Long menuId);

}
