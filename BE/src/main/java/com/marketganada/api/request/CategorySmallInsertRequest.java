package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ApiModel("CategorySmallInsertRequest")
public class CategorySmallInsertRequest {
    @ApiModelProperty(name = "중분류 ID")
    @NotNull(message = "상위 중분류 ID값을 입력해주세요.")
    Long categoryMiddleId;

    @ApiModelProperty(name = "소분류 이름")
    @NotBlank(message = "소분류명을 입력해주세요.")
    String categoryName;
}
