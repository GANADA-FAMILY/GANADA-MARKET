package com.marketganada.common;

import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Product;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class AuctionSpecification {
    public static Specification<Auction> greaterThanEndTime(Date endTime) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThan(root.get("endTime"), endTime);
    }

    public static Specification<Auction> isAuctionStatus() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isTrue(root.get("auctionStatus"));
    }

    public static Specification<Auction> inProduct(List<Product> products) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = getPredicateOfProduct(products, root, criteriaBuilder);
            return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
        };
    }

    private static List<Predicate> getPredicateOfProduct(List<Product> products, Root<Auction> root, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        for(Product p : products) {
            predicates.add(criteriaBuilder.equal(root.get("product"), p));
        }

        return predicates;
    }
}
