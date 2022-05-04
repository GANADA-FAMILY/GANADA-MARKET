/**
 *
 * UserNicknameUpdateRequset
 * 닉네임 수정 Request
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-21
 * 마지막 수정일 2022-03-21
 **/
package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ApiModel("UserNicknameUpdateRequset")
public class UserNicknameUpdateRequest {
    @NotBlank
    String userNickname;
}
