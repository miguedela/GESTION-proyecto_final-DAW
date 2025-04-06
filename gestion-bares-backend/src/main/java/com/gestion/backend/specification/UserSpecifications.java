package com.gestion.backend.specification;

import java.util.Map;
import java.util.function.BiFunction;

import com.gestion.backend.entity.OurUser;
import com.gestion.backend.enums.Roles;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class UserSpecifications {

    public static BiFunction<Root<OurUser>, CriteriaBuilder, Predicate> filterByRole(Map<String, String> filters) {
        return (root, cb) -> cb.equal(root.get("role"), Roles.valueOf(filters.get("role")));
    }

    public static BiFunction<Root<OurUser>, CriteriaBuilder, Predicate> filterByGeneral(Map<String, String> filters) {
        return (root, cb) -> {
            String searchValue = filters.get("general").toLowerCase();
            return cb.or(
                cb.like(cb.lower(root.get("name")), "%" + searchValue + "%"),
                cb.like(cb.lower(root.get("email")), "%" + searchValue + "%"),
                cb.like(cb.lower(root.get("role")), "%" + searchValue + "%")
            );
        };
    }
}
