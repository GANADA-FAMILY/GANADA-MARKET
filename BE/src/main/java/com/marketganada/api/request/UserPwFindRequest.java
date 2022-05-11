package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ApiModel("UserPwFindRequest")
public class UserPwFindRequest {
    @ApiModelProperty(name = "유저 Phone", example = "01012341234")
    @NotBlank
    String userPhone;
    @ApiModelProperty(name = "유저 Email ", example = "ssafy@ssafy.com")
    @Email
    String userEmail;
}
