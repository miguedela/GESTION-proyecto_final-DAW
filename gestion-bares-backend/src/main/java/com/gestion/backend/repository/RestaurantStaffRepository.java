package com.gestion.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.util.Streamable;

import com.gestion.backend.entity.OurUser;
import com.gestion.backend.entity.Restaurant;
import com.gestion.backend.entity.relation.RestaurantStaff;

public interface RestaurantStaffRepository extends JpaRepository<RestaurantStaff, Long> {

	Optional<RestaurantStaff> findById(Long id);

	RestaurantStaff findByRestaurantId(Long id);

	RestaurantStaff findByStaffId(Long id);

	boolean existsByStaffAndRestaurant(OurUser user, Restaurant restaurant);

	Streamable<RestaurantStaff> findAllByStaffId(Long id);

	Streamable<RestaurantStaff> findAllByRestaurantId(Long restaurantId);

}
