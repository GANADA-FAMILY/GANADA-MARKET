package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@ApiModel("UserSignUpRequest")
public class UserSignUpRequest {
    @ApiModelProperty(name = "유저 Email ", example = "ssafy@ssafy.com")
    @Email
    String userEmail;
    @ApiModelProperty(name = "유저 Password", example = "ssafy!@#")
    @Size(min=8,max=16)
    String userPw;
    @ApiModelProperty(name = "유저 Nickname", example = "김싸피")
    @NotBlank
    String userNickname;
    @ApiModelProperty(name = "유저 Phone", example = "01012341234")
    @NotBlank
    String userPhone;
}



