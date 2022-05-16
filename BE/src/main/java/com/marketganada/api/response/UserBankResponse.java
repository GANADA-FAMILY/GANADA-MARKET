package com.marketganada.api.response;

import com.marketganada.common.AES256;
import com.marketganada.db.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;


@Getter
@Setter
@ApiModel("UserBankResponse")
public class UserBankResponse {

    String bank;
    String bankNum;
    String bankHolder;

    public static UserBankResponse of(User user) throws Exception {
        UserBankResponse res = new UserBankResponse();

        res.setBank(user.getBank());
        res.setBankHolder(user.getBankHolder());
        if(user.getBankNum()!=null){
            AES256 aes256 = new AES256();
            String bankNum = aes256.decrypt(user.getBankNum());
            StringBuffer sb = new StringBuffer(bankNum);
            sb.replace(3,10,"*******");
            res.setBankNum(String.valueOf(sb));
        }else {
            res.setBankNum(user.getBankNum());
        }


        res.setBank(user.getBank());
        res.setBankHolder(user.getBankHolder());

        return res;
    }
}
