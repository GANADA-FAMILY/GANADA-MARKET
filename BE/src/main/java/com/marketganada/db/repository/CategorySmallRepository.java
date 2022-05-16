package com.marketganada.db.repository;

import com.marketganada.db.entity.CategorySmall;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategorySmallRepository extends JpaRepository<CategorySmall,Long> {
    Optional<CategorySmall> findByName(String name);
}
