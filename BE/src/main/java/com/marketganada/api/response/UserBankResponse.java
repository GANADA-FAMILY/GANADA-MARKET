package com.marketganada.api.response;

import com.marketganada.common.AES256;
import com.marketganada.db.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Getter
@Setter
@ApiModel("UserBankResponse")
public class UserBankResponse extends BaseResponseBody{

    String bank;
    String bankNum;
    String bankHolder;

    public static UserBankResponse of(Integer statusCode, String message, User user) throws Exception {

        UserBankResponse res = new UserBankResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);

        AES256 aes256 = new AES256();
        String bankNum = aes256.decrypt(user.getBankNum());
        StringBuffer sb = new StringBuffer(bankNum);
        sb.replace(3,10,"*******");

        res.setBank(user.getBank());
        res.setBankNum(String.valueOf(sb));
        res.setBankHolder(user.getBankHolder());

        return res;
    }
}
