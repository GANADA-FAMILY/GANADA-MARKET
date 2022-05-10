package com.marketganada.api.response;

import com.marketganada.db.entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ProductDetailResponse extends BaseResponseBody {
    String productName;
    String productBrand;
    Date releaseDate;
    int releasePrice;
    String deviceId;
    String description;
    String categoryLarge;
    String categoryMiddle;
    String categorySmall;

    public static ProductDetailResponse of(int statusCode, String message, Product product) {
        ProductDetailResponse res = new ProductDetailResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);

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