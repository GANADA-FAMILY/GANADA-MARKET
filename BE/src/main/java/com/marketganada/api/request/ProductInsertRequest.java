package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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
    @NotNull
    Date releaseDate;

    @ApiModelProperty(name = "제품 출고가")
    @NotNull
    int releasePrice;

    @ApiModelProperty(name = "제품 모델명")
    @NotBlank
    String deviceId;

    @ApiModelProperty(name = "제품 설명")
    @NotBlank
    String description;

    @ApiModelProperty(name = "대분류 ID")
    @NotNull
    Long categoryLarge;

    @ApiModelProperty(name = "중분류 ID")
    @NotNull
    Long categoryMiddle;

    @ApiModelProperty(name = "소분류 ID")
    @NotNull
    Long categorySmall;
}
