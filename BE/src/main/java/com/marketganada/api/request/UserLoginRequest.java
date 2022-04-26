package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Getter
@Setter
@ApiModel("UserLoginRequest")
public class UserLoginRequest {
    @ApiModelProperty(name = "유저 ID", example = "ssafy@ssafy.com")
    @Email
    String userEmail;
    @ApiModelProperty(name = "유저 Password", example = "ssafy!@#")
    @Size(min=8,max=16)
    String userPw;


}
