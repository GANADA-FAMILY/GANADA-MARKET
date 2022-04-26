package com.marketganada.api.contoroller;


import com.marketganada.api.request.UserLoginRequest;
import com.marketganada.api.response.UserLoginResponse;
import com.marketganada.api.service.UserService;
import com.marketganada.common.auth.GanadaUserDetails;
import com.marketganada.common.auth.JwtTokenUtil;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>아이디</strong>와 <strong>패스워드를</strong> 통해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginResponse.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserLoginResponse> login(@RequestBody @ApiParam(value = "로그인 요청 정보", required = true) UserLoginRequest userLoginRequest) {
        String user = userService.login(userLoginRequest);
        if (user.equals("fail1")) {
            return ResponseEntity.status(401).body(UserLoginResponse.of(401,"존재하지 않는 아이디 입니다.",null));
        }else if(user.equals("fail2")){
            return ResponseEntity.status(401).body(UserLoginResponse.of(401,"비밀번호를 확인 해 주세요.",null));
        }

        return ResponseEntity.ok(UserLoginResponse.of(200,"Success", JwtTokenUtil.getToken(userLoginRequest.getUserEmail())));
    }

}
