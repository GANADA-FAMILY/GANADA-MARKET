package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@ApiModel("ProductInsertRequest")
public class ProductInsertRequest {
    @ApiModelProperty(name = "제품 이름")
    String productName;

    @ApiModelProperty(name = "제품 브랜드")
    String productBrand;

    @ApiModelProperty(name = "제품 출시일")
    Date releaseDate;

    @ApiModelProperty(name = "제품 출고가")
    int releasePrice;

    @ApiModelProperty(name = "제품 모델명")
    String deviceId;

    @ApiModelProperty(name = "제품 설명")
    String description;

    @ApiModelProperty(name = "대분류 ID")
    int categoryLarge;

    @ApiModelProperty(name = "중분류 ID")
    int categoryMiddle;

    @ApiModelProperty(name = "소분류 ID")
    int categorySmall;
}
