package com.marketganada.db.repository;

import com.marketganada.db.entity.Product;
import com.marketganada.db.entity.ProductHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductHistoryRepository extends JpaRepository<ProductHistory,Long> {
    List<ProductHistory> findByProduct(Product product);
}
