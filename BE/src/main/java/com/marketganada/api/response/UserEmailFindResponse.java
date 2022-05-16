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
@ApiModel("UserEmailFindResponse")
public class UserEmailFindResponse extends BaseResponseBody{
    Map<String,Object> data;
//    List<String> emailList;

    public static UserEmailFindResponse of(Integer statusCode, String message, List<User> userList) {
        UserEmailFindResponse res = new UserEmailFindResponse();
        Map<String,Object> data = new HashMap<>();
        List<Map<String,Object>> emailList = new ArrayList<>();

        res.setStatusCode(statusCode);
        res.setMessage(message);


        for(User user : userList){
            Map<String, Object> emailInfo = new HashMap<>();
            String splitEmail[] = user.getUserEmail().split("@");
            StringBuffer sb = new StringBuffer(splitEmail[0]);
            for(int i=1; i<splitEmail[0].length()-1; i++){
                sb.replace(i,i+1,"*");
            }
            emailInfo.put("userEmail",sb+"@"+splitEmail[1]);
            emailList.add(emailInfo);
        }
        data.put("emailList",emailList);
        res.setData(data);

        return res;
    }
}
