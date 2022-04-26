package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserLoginRequest")
public class UserLoginRequest {
    @ApiModelProperty(name = "유저 ID", example = "ssafy@ssafy.com")
    String userEmail;
    @ApiModelProperty(name = "유저 Password", example = "ssafy!@#")
    String userPw;

}
