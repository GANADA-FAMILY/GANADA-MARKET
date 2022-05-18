package com.marketganada.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.marketganada.db.entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ProductDetailResponse {
    String productName;
    String productBrand;
    @JsonFormat(timezone = "Asia/Seoul")
    Date releaseDate;
    int releasePrice;
    String deviceId;
    String description;
    String categoryLarge;
    String categoryMiddle;
    String categorySmall;

    public static ProductDetailResponse from(Product product) {
        ProductDetailResponse res = new ProductDetailResponse();

        if(product != null) {
            res.setProductName(product.getProductName());
            res.setProductBrand(product.getProductBrand());
            res.setReleaseDate(product.getReleaseDate());
            res.setReleasePrice(product.getReleasePrice());
            res.setDeviceId(product.getDeviceId());
            res.setDescription(product.getDescription());
            res.setCategoryLarge(product.getCategoryLarge().getName());
            res.setCategoryMiddle(product.getCategoryMiddle().getName());
            res.setCategorySmall(product.getCategorySmall().getName());
        }

        return res;
    }
}
