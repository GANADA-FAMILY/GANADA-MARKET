package com.marketganada.common;

import com.marketganada.db.entity.Product;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {
    public static Specification<Product> equalProductName(String productName) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("productName"), productName);
    }

    public static Specification<Product> equalProductBrand(String productBrand) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("productBrand"), productBrand);
    }

    public static Specification<Product> equalCategoryLargeName(String categoryLargeName) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("categoryLarge").get("name"), categoryLargeName);
    }

    public static Specification<Product> equalCategorySmallName(String categorySmallName) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("categorySmall").get("name"), categorySmallName);
    }
}
