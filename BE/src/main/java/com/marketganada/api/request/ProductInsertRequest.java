package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Getter
@Setter
@ApiModel("ProductInsertRequest")
public class ProductInsertRequest {
    @ApiModelProperty(name = "제품 이름")
    @NotBlank
    String productName;

    @ApiModelProperty(name = "제품 브랜드")
    @NotBlank
    String productBrand;

    @ApiModelProperty(name = "제품 출시일")
    @NotBlank
    Date releaseDate;

    @ApiModelProperty(name = "제품 출고가")
    @NotBlank
    int releasePrice;

    @ApiModelProperty(name = "제품 모델명")
    @NotBlank
    String deviceId;

    @ApiModelProperty(name = "제품 설명")
    @NotBlank
    String description;

    @ApiModelProperty(name = "대분류 ID")
    @NotBlank
    Long categoryLarge;

    @ApiModelProperty(name = "중분류 ID")
    @NotBlank
    Long categoryMiddle;

    @ApiModelProperty(name = "소분류 ID")
    @NotBlank
    Long categorySmall;
}
