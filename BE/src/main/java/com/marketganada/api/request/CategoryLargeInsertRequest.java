package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ApiModel("CategoryLargeInsertRequest")
public class CategoryLargeInsertRequest {
    @ApiModelProperty(name = "대분류 이름")
    @NotBlank
    String categoryName;
}
