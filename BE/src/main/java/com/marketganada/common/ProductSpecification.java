package com.marketganada.common;

import com.marketganada.db.entity.Product;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {
//    public static Specification<Product> equalProductName(String productName) {
//        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("productName"), productName);
//    }

    public static Specification<Product> equalProductNames(List<String> productNames) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = getPredicateOfProductName(productNames,root,criteriaBuilder);
            return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
        };
    }

    private static List<Predicate> getPredicateOfProductName(List<String> names, Root<Product> root, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        for(String s : names) {
            if(!s.equals("ALL"))
                predicates.add(criteriaBuilder.equal(root.get("productName"), s));
        }

        return predicates;
    }

//    public static Specification<Product> equalProductBrand(String productBrand) {
//        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("productBrand"), productBrand);
//    }

    public static Specification<Product> equalProductBrands(List<String> productBrands) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = getPredicateOfProductBrand(productBrands,root,criteriaBuilder);
            return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
        };
    }

    private static List<Predicate> getPredicateOfProductBrand(List<String> names, Root<Product> root, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        for(String s : names) {
            if(!s.equals("ALL"))
                predicates.add(criteriaBuilder.equal(root.get("productBrand"), s));
        }

        return predicates;
    }

    public static Specification<Product> equalCategoryLargeName(String categoryLargeName) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("categoryLarge").get("name"), categoryLargeName);
    }

//    public static Specification<Product> equalCategorySmallName(String categorySmallName) {
//        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("categorySmall").get("name"), categorySmallName);
//    }

    public static Specification<Product> equalCategorySmallNames(List<String> categorySmallNames) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = getPredicateOfCategorySmallName(categorySmallNames,root,criteriaBuilder);
            return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
        };
    }

    private static List<Predicate> getPredicateOfCategorySmallName(List<String> names, Root<Product> root, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        for(String s : names) {
            if(!s.equals("ALL"))
                predicates.add(criteriaBuilder.equal(root.get("categorySmall").get("name"), s));
        }

        return predicates;
    }
}
