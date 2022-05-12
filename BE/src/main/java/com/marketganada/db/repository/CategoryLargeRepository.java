package com.marketganada.db.repository;

import com.marketganada.db.entity.CategoryLarge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryLargeRepository extends JpaRepository<CategoryLarge,Long> {
    Optional<CategoryLarge> findByName(String name);
}
