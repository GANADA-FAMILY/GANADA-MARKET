/**
*
* UserLoginResponse
* 로그인 response 생성
*
* @author Alice,David
* @version 1.0.0
* 생성일 2022-03-11
* 마지막 수정일 2022-03-11
**/
package com.marketganada.api.response;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginResponse {
    String token;

    public static UserLoginResponse of(String accessToken) {
        UserLoginResponse res = new UserLoginResponse();

        res.setToken(accessToken);

        return res;
    }

}
