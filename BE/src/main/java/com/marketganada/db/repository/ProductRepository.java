package com.marketganada.db.repository;

import com.marketganada.db.entity.Product;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long>, JpaSpecificationExecutor<Product> {
    @Override
    @EntityGraph(attributePaths = {"categoryLarge","categoryMiddle","categorySmall"}, type = EntityGraph.EntityGraphType.LOAD)
    List<Product> findAll(Specification<Product> spec);
}
