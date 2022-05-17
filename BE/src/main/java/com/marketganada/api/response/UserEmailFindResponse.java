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
public class UserEmailFindResponse {

    List<String> emailList;

    public static UserEmailFindResponse of(List<User> userList) {
        UserEmailFindResponse res = new UserEmailFindResponse();
        List<String> emailList = new ArrayList<>();

        for(User user : userList){
            String splitEmail[] = user.getUserEmail().split("@");
            StringBuffer sb = new StringBuffer(splitEmail[0]);
            for(int i=1; i<splitEmail[0].length()-1; i++){
                sb.replace(i,i+1,"*");
            }
            emailList.add(sb+"@"+splitEmail[1]);
        }

        res.setEmailList(emailList);

        return res;
    }
}
