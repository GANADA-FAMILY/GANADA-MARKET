package com.marketganada.api.response;

import com.marketganada.db.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ApiModel("UserInfoResponse")
public class UserInfoResponse {

    String userEmail;
    String userNickname;
    String userPhone;
    String profileImageUrl;
    String grade;

    public static UserInfoResponse of(User user) {
        UserInfoResponse res = new UserInfoResponse();

        StringBuffer sb = new StringBuffer(user.getUserPhone());
        sb.replace(3,8,"*****");
        
        res.setUserEmail(user.getUserEmail());
        res.setUserNickname(user.getUserNickname());
        res.setUserPhone(String.valueOf(sb));
        res.setProfileImageUrl(user.getProfileImageUrl());
        res.setGrade(user.getGrade());

        return res;
    }
}
