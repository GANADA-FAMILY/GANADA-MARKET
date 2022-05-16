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
public class UserBankResponse extends BaseResponseBody{
    Map<String,Object> data;
//    String bank;
//    String bankNum;
//    String bankHolder;

    public static UserBankResponse of(Integer statusCode, String message, User user) throws Exception {
        UserBankResponse res = new UserBankResponse();
        Map<String,Object> data = new HashMap<>();
        Map<String, Object> bankInfo = new HashMap<>();

        res.setStatusCode(statusCode);
        res.setMessage(message);


        AES256 aes256 = new AES256();
        String bankNum = aes256.decrypt(user.getBankNum());
        StringBuffer sb = new StringBuffer(bankNum);
        sb.replace(3,10,"*******");

//        res.setBank(user.getBank());
//        res.setBankNum(String.valueOf(sb));
//        res.setBankHolder(user.getBankHolder());
        bankInfo.put("bank",user.getBank());
        bankInfo.put("BankNum",String.valueOf(sb));
        bankInfo.put("BankHolder",user.getBankHolder());

        data.put("bankInfo",bankInfo);
        res.setData(data);

        return res;
    }
}
