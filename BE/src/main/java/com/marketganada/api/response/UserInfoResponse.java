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
public class UserInfoResponse extends BaseResponseBody{
    Map<String,Object> data;
//    String userEmail;
//    String userNickname;
//    String userPhone;
//    String profileImageUrl;
//    String grade;

    public static UserInfoResponse of(Integer statusCode, String message, User user) {
        UserInfoResponse res = new UserInfoResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        Map<String,Object> data = new HashMap<>();
        Map<String, Object> userInfo = new HashMap<>();

        StringBuffer sb = new StringBuffer(user.getUserPhone());
        sb.replace(3,8,"*****");

        userInfo.put("userEmail",user.getUserEmail());
        userInfo.put("userNickname",user.getUserNickname());
        userInfo.put("userPhone",String.valueOf(sb));
        userInfo.put("profileImageUrl",user.getProfileImageUrl());
        userInfo.put("grade",user.getGrade());

        data.put("userInfo",userInfo);
        res.setData(data);

        return res;
    }
}
