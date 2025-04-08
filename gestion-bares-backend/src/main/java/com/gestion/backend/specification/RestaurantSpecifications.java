package com.gestion.backend.specification;

import java.util.Map;
import java.util.function.BiFunction;

import com.gestion.backend.entity.Restaurant;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class RestaurantSpecifications {

	public static BiFunction<Root<Restaurant>, CriteriaBuilder, Predicate> filterByGeneral(
			Map<String, String> filters) {
		return (root, cb) -> {			
			String serachValue = filters.get("general").toLowerCase();
			return cb.or(
				cb.like(cb.lower(root.get("name")), "%" + serachValue + "%"),
				cb.like(cb.lower(root.get("email")), "%" + serachValue + "%"),
				cb.like(cb.lower(root.get("phone")), "%" + serachValue + "%")
				);
		};
	}

}
