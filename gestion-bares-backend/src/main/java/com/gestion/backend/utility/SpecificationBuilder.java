package com.gestion.backend.utility;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiFunction;
import java.util.function.Function;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class SpecificationBuilder<T> {

    private final Map<String, BiFunction<Root<T>, CriteriaBuilder, Predicate>> conditions = new HashMap<>();

    public SpecificationBuilder<T> with(String key, Function<String, BiFunction<Root<T>, CriteriaBuilder, Predicate>> valueMapper) {
        conditions.put(key, valueMapper.apply(key));
        return this;
    }

    public Specification<T> build(Map<String, String> filters) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            for (Map.Entry<String, String> entry : filters.entrySet()) {
                String key = entry.getKey();

                if (conditions.containsKey(key)) {
                    predicates.add(conditions.get(key).apply(root, cb));
                }
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
