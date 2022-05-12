package com.marketganada.db.repository;

import com.marketganada.db.entity.CategoryLarge;
import com.marketganada.db.entity.CategoryMiddle;
import com.marketganada.db.entity.CategorySmall;
import com.marketganada.db.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long>, JpaSpecificationExecutor<Product> {
    List<Product> findByProductBrandAndProductNameAndCategoryLargeAndCategoryMiddleAndCategorySmall(
            String productBrand,
            String productName,
            CategoryLarge categoryLarge,
            CategoryMiddle categoryMiddle,
            CategorySmall categorySmall);

    List<Product> findByProductBrandAndProductNameAndCategoryLargeAndCategoryMiddle(
            String productBrand,
            String productName,
            CategoryLarge categoryLarge,
            CategoryMiddle categoryMiddle
    );

    List<Product> findByProductBrandAndProductNameAndCategoryLarge(
            String productBrand,
            String productName,
            CategoryLarge categoryLarge
    );
}
