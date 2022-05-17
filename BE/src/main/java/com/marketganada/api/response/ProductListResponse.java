package com.marketganada.api.response;

import com.marketganada.db.entity.CategoryLarge;
import com.marketganada.db.entity.CategoryMiddle;
import com.marketganada.db.entity.CategorySmall;
import com.marketganada.db.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ProductListResponse {
    List<ReturnProduct> products;

    public static ProductListResponse from(List<Product> inputProducts) {
        ProductListResponse res = new ProductListResponse();
        res.setProducts(new ArrayList<>());

        for(Product p : inputProducts) {
            res.getProducts().add(ReturnProduct.builder()
                    .product(p)
                    .build());
        }

        return res;
    }

    @Getter
    static class ReturnProduct {
        private Long productId;
        private String categoryLarge;
        private String categoryMiddle;
        private String categorySmall;
        private String productName;
        private String productBrand;
        private String deviceId;
        private String description;
        private Date releaseDate;
        private int releasePrice;

        @Builder
        public ReturnProduct(Product product) {
            productId = product.getProductId();
            categoryLarge = product.getCategoryLarge().getName();
            categoryMiddle = product.getCategoryMiddle().getName();
            categorySmall = product.getCategorySmall().getName();
            productName = product.getProductName();
            productBrand = product.getProductBrand();
            deviceId = product.getDeviceId();
            description = product.getDescription();
            releaseDate = product.getReleaseDate();
            releasePrice = product.getReleasePrice();
        }
    }
}
