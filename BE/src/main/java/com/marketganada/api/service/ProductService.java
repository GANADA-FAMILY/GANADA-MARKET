package com.marketganada.api.service;

import com.marketganada.api.request.*;
import com.marketganada.db.entity.CategoryLarge;
import com.marketganada.db.entity.CategoryMiddle;
import com.marketganada.db.entity.CategorySmall;
import com.marketganada.db.entity.Product;

import java.util.List;

public interface ProductService {
    String insertProductInfo(ProductInsertRequest productInsertRequest);
    Product getProductById(Long productId);
    List<Product> getProductList();
    String updateProduct(ProductInsertRequest productInsertRequest, Long productId);
    String deleteProductById(Long productId);

    String insertCategoryLarge(CategoryLargeInsertRequest categoryLargeInsertRequest);
    CategoryLarge getCategoryLargeById(Long categoryLargeId);
    List<CategoryLarge> getCategoryLargeList();
    String updateCategoryLarge(CategoryLargeInsertRequest categoryLargeInsertRequest, Long categoryLargeId);
    String deleteCategoryLarge(Long categoryLargeId);

    String insertCategoryMiddle(CategoryMiddleInsertRequest categoryMiddleInsertRequest);
    CategoryMiddle getCategoryMiddleById(Long categoryMiddleId);
    List<CategoryMiddle> getCategoryMiddleList();
    String updateCategoryMiddle(CategoryMiddleInsertRequest categoryMiddleInsertRequest, Long categoryMiddleId);
    String deleteCategoryMiddle(Long categoryMiddleId);

    String insertCategorySmall(CategorySmallInsertRequest categorySmallInsertRequest);
    CategorySmall getCategorySmallById(Long categorySmallId);
    List<CategorySmall> getCategorySmallList();
    String updateCategorySmall(CategorySmallInsertRequest categorySmallInsertRequest, Long categorySmallId);
    String deleteCategorySmall(Long categorySmallId);
}
