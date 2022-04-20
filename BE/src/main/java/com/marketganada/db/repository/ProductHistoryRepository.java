package com.marketganada.db.repository;

import com.marketganada.db.entity.ProductHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductHistoryRepository extends JpaRepository<ProductHistory,Integer> {
}
