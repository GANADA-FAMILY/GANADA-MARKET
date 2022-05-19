package com.marketganada.api.service;

import com.marketganada.api.request.UserPwFindRequest;
import com.marketganada.db.entity.User;
import com.marketganada.db.repository.UserRepository;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service("smsService")
public class SmsServiceImpl implements SmsService{

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    private BCryptPasswordEncoder encodePwd;

    @Value("${coolsms.key}")
    String api_key;
    @Value("${coolsms.secret}")
    String api_secret;

    public static String getRamdomNumber(int len) {
        char[] charSet = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};
        int idx = 0;
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < len; i++) {
            idx = (int) (charSet.length * Math.random()); // 36 * 생성된 난수를 Int로 추출 (소숫점제거)
            sb.append(charSet[idx]);
        }
        return sb.toString();
    }

    @Override
    public String sendUserPw(User user, UserPwFindRequest userPwFindRequest) {
        if(user.getUserPhone().equals(userPwFindRequest.getUserPhone())){

            //새 비밀번호 생성, 변경
            String tempPw = getRamdomNumber(10);
            user.setUserPw(encodePwd.encode(tempPw));
            userRepository.save(user);

            //메시지 발송
            Message coolSmS = new Message(api_key, api_secret);

            // 4 params(to, from, type, text) are mandatory. must be filled
            HashMap<String, String> params = new HashMap<String, String>();
            params.put("to", userPwFindRequest.getUserPhone());    // 수신전화번호
            params.put("from", "01055562491");    // 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
            params.put("type", "SMS");
            params.put("text", "가나다마켓 비밀번호 찾기 : 비밀번호는" + "["+tempPw+"]" + "입니다.");
            params.put("app_version", "test app 1.2"); // application name and version

            try {
                JSONObject obj = (JSONObject) coolSmS.send(params);
                System.out.println(obj.toString());
            } catch (CoolsmsException e) {
                System.out.println(e.getMessage());
                System.out.println(e.getCode());
            }

            return "success";
        }
        return "fail";
    }
}
