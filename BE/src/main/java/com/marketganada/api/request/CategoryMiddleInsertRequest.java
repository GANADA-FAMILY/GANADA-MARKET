package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ApiModel("CategoryMiddleInsertRequest")
public class CategoryMiddleInsertRequest {
    @ApiModelProperty(name = "대분류 ID")
    @NotNull(message = "상위 대분류 ID값을 입력해주세요.")
    Long categoryLargeId;

    @ApiModelProperty(name = "중분류 이름")
    @NotBlank(message = "중분류명을 입력해주세요.")
    String categoryName;
}
