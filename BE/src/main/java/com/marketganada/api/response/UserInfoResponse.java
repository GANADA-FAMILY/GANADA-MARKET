package com.marketganada.api.response;

import com.marketganada.db.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserInfoResponse")
public class UserInfoResponse extends BaseResponseBody{
    String userEmail;
    String userNickname;
    String userPhone;
    String profileImageUrl;

    public static UserInfoResponse of(Integer statusCode, String message, User user) {
        UserInfoResponse res = new UserInfoResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);

        res.setUserEmail(user.getUserEmail());
        res.setUserNickname(user.getUserNickname());
        res.setUserPhone(user.getUserPhone());
        res.setProfileImageUrl(user.getProfileImageUrl());

        return res;
    }
}
