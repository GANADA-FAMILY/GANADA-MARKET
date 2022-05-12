package com.marketganada.db.repository;

import com.marketganada.db.entity.CategoryMiddle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryMiddleRepository extends JpaRepository<CategoryMiddle,Long> {
    Optional<CategoryMiddle> findByName(String name);
}
