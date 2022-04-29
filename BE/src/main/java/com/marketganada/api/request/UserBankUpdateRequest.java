package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;


@Getter
@Setter
@ApiModel("UserBankUpdateRequest")
public class UserBankUpdateRequest {
    @ApiModelProperty(name = "은행", example = "농협")
    @NotBlank
    String bank;
    @ApiModelProperty(name = "계좌번호", example = "356123413412")
    @NotBlank
    String bankNum;
    @ApiModelProperty(name = "예금주", example = "기믄준")
    @NotBlank
    String bankHolder;
}
