package com.marketganada.api.service;

import com.marketganada.api.request.*;
import com.marketganada.db.entity.*;
import com.marketganada.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service("ProductService")
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    CategoryLargeRepository categoryLargeRepository;
    @Autowired
    CategoryMiddleRepository categoryMiddleRepository;
    @Autowired
    CategorySmallRepository categorySmallRepository;
    @Autowired
    ProductHistoryRepository productHistoryRepository;

    @Override
    public String insertProductInfo(ProductInsertRequest productInsertRequest) {
        CategoryLarge categoryLarge;
        CategoryMiddle categoryMiddle;
        CategorySmall categorySmall;
        try {
            categoryLarge = getCategoryLargeById(productInsertRequest.getCategoryLarge());
            categoryMiddle = getCategoryMiddleById(productInsertRequest.getCategoryMiddle());
            categorySmall = getCategorySmallById(productInsertRequest.getCategorySmall());
        } catch (ResponseStatusException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        Product product = Product.builder()
                .categoryLarge(categoryLarge)
                .categoryMiddle(categoryMiddle)
                .categorySmall(categorySmall)
                .deviceId(productInsertRequest.getDeviceId())
                .description(productInsertRequest.getDescription())
                .productBrand(productInsertRequest.getProductBrand())
                .productName(productInsertRequest.getProductName())
                .releaseDate(productInsertRequest.getReleaseDate())
                .releasePrice(productInsertRequest.getReleasePrice())
                .build();
        productRepository.save(product);

        return "success";
    }

    @Override
    public Product getProductById(Long productId) {
        Optional<Product> product = productRepository.findById(productId);

        if(!product.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return product.get();
    }

    @Override
    public List<Product> getProductList() {
        List<Product> products = productRepository.findAll();
        return products;
    }

    @Override
    public String updateProduct(ProductInsertRequest productInsertRequest, Long productId) {
        Optional<Product> product = productRepository.findById(productId);

        if(!product.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        CategoryLarge categoryLarge;
        CategoryMiddle categoryMiddle;
        CategorySmall categorySmall;
        try {
            categoryLarge = getCategoryLargeById(productInsertRequest.getCategoryLarge());
            categoryMiddle = getCategoryMiddleById(productInsertRequest.getCategoryMiddle());
            categorySmall = getCategorySmallById(productInsertRequest.getCategorySmall());
        } catch (ResponseStatusException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        product.get().update(productInsertRequest, categoryLarge, categoryMiddle, categorySmall);
        productRepository.save(product.get());

        return "success";
    }

    @Override
    public String deleteProductById(Long productId) {
        Optional<Product> product = productRepository.findById(productId);

        if(!product.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        productRepository.deleteById(productId);
        return "success";
    }

    @Override
    public String insertCategoryLarge(CategoryLargeInsertRequest categoryLargeInsertRequest) {
        CategoryLarge categoryLarge = CategoryLarge.builder()
                .name(categoryLargeInsertRequest.getCategoryName())
                .build();
        categoryLargeRepository.save(categoryLarge);

        return "success";
    }

    @Override
    public CategoryLarge getCategoryLargeById(Long categoryLargeId) {
        Optional<CategoryLarge> categoryLarge = categoryLargeRepository.findById(categoryLargeId);

        if(!categoryLarge.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return categoryLarge.get();
    }

    @Override
    public List<CategoryLarge> getCategoryLargeList() {
        List<CategoryLarge> categoryLarges = categoryLargeRepository.findAll();
        return categoryLarges;
    }

    @Override
    public String updateCategoryLarge(CategoryLargeInsertRequest categoryLargeInsertRequest, Long categoryLargeId) {
        Optional<CategoryLarge> categoryLarge = categoryLargeRepository.findById(categoryLargeId);

        if(!categoryLarge.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        categoryLarge.get().update(categoryLargeInsertRequest);
        categoryLargeRepository.save(categoryLarge.get());

        return "success";
    }

    @Override
    public String deleteCategoryLarge(Long categoryLargeId) {
        Optional<CategoryLarge> categoryLarge = categoryLargeRepository.findById(categoryLargeId);

        if(!categoryLarge.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        categoryLargeRepository.deleteById(categoryLargeId);
        return "success";
    }

    @Override
    public String insertCategoryMiddle(CategoryMiddleInsertRequest categoryMiddleInsertRequest) {
        Optional<CategoryLarge> categoryLarge = categoryLargeRepository.findById(categoryMiddleInsertRequest.getCategoryLargeId());

        if(!categoryLarge.isPresent())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        CategoryMiddle categoryMiddle = CategoryMiddle.builder()
                .name(categoryMiddleInsertRequest.getCategoryName())
                .categoryLarge(categoryLarge.get())
                .build();
        categoryMiddleRepository.save(categoryMiddle);

        return "success";
    }

    @Override
    public CategoryMiddle getCategoryMiddleById(Long categoryMiddleId) {
        Optional<CategoryMiddle> categoryMiddle = categoryMiddleRepository.findById(categoryMiddleId);

        if(!categoryMiddle.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return categoryMiddle.get();
    }

    @Override
    public List<CategoryMiddle> getCategoryMiddleList() {
        List<CategoryMiddle> categoryMiddles = categoryMiddleRepository.findAll();

        return categoryMiddles;
    }

    @Override
    public String updateCategoryMiddle(CategoryMiddleInsertRequest categoryMiddleInsertRequest, Long categoryMiddleId) {
        Optional<CategoryMiddle> categoryMiddle = categoryMiddleRepository.findById(categoryMiddleId);
        Optional<CategoryLarge> categoryLarge = categoryLargeRepository.findById(categoryMiddleInsertRequest.getCategoryLargeId());

        if(!categoryMiddle.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        if(!categoryLarge.isPresent())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        categoryMiddle.get().update(categoryMiddleInsertRequest, categoryLarge.get());
        categoryMiddleRepository.save(categoryMiddle.get());

        return "success";
    }

    @Override
    public String deleteCategoryMiddle(Long categoryMiddleId) {
        Optional<CategoryMiddle> categoryMiddle = categoryMiddleRepository.findById(categoryMiddleId);

        if(!categoryMiddle.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        categoryMiddleRepository.deleteById(categoryMiddleId);
        return "success";
    }

    @Override
    public String insertCategorySmall(CategorySmallInsertRequest categorySmallInsertRequest) {
        Optional<CategoryMiddle> categoryMiddle = categoryMiddleRepository.findById(categorySmallInsertRequest.getCategoryMiddleId());

        if(!categoryMiddle.isPresent())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        CategorySmall categorySmall = CategorySmall.builder()
                .name(categorySmallInsertRequest.getCategoryName())
                .categoryMiddle(categoryMiddle.get())
                .build();
        categorySmallRepository.save(categorySmall);

        return "success";
    }

    @Override
    public CategorySmall getCategorySmallById(Long categorySmallId) {
        Optional<CategorySmall> categorySmall = categorySmallRepository.findById(categorySmallId);

        if(!categorySmall.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return categorySmall.get();
    }

    @Override
    public List<CategorySmall> getCategorySmallList() {
        List<CategorySmall> categorySmalls = categorySmallRepository.findAll();
        return categorySmalls;
    }

    @Override
    public String updateCategorySmall(CategorySmallInsertRequest categorySmallInsertRequest, Long categorySmallId) {
        Optional<CategorySmall> categorySmall = categorySmallRepository.findById(categorySmallId);
        Optional<CategoryMiddle> categoryMiddle = categoryMiddleRepository.findById(categorySmallInsertRequest.getCategoryMiddleId());

        if(!categorySmall.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        if(!categoryMiddle.isPresent())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        categorySmall.get().update(categorySmallInsertRequest, categoryMiddle.get());
        categorySmallRepository.save(categorySmall.get());

        return "success";
    }

    @Override
    public String deleteCategorySmall(Long categorySmallId) {
        Optional<CategorySmall> categorySmall = categorySmallRepository.findById(categorySmallId);

        if(!categorySmall.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        categorySmallRepository.deleteById(categorySmallId);
        return "success";
    }

    @Override
    public int getRecentPrice(Product product) {
        Sort sort = Sort.by(Sort.Direction.DESC, "historyId");
        int recentPrice = 0;
        List<ProductHistory> productHistory = productHistoryRepository.findByProduct(product,sort);

        if(productHistory.size() > 0)
            recentPrice = productHistory.get(0).getHistoryPrice();

        return recentPrice;
    }
}
