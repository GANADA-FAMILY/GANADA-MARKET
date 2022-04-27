package com.marketganada.api.contoroller;


import com.marketganada.api.request.UserLoginRequest;
import com.marketganada.api.request.UserSignUpRequest;
import com.marketganada.api.response.BaseResponseBody;
import com.marketganada.api.response.UserLoginResponse;
import com.marketganada.api.service.UserService;
import com.marketganada.common.auth.GanadaUserDetails;
import com.marketganada.common.auth.JwtTokenUtil;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
    public ResponseEntity<UserLoginResponse> login(@RequestBody @ApiParam(value = "로그인 요청 정보", required = true) @Valid UserLoginRequest userLoginRequest) {
        String result = userService.login(userLoginRequest);
        if (result.equals("fail1")) {
            return ResponseEntity.status(401).body(UserLoginResponse.of(401,"존재하지 않는 아이디 입니다.",null));
        }else if(result.equals("fail2")){
            return ResponseEntity.status(401).body(UserLoginResponse.of(401,"비밀번호를 확인 해 주세요.",null));
        }

        return ResponseEntity.ok(UserLoginResponse.of(200,"Success", JwtTokenUtil.getToken(userLoginRequest.getUserEmail())));
    }

    @PostMapping("/signup")
    @ApiOperation(value = "회원가입", notes = "입력한 회원 정보 를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginResponse.class),
            @ApiResponse(code = 409, message = "회원가입 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> signup(@RequestBody @ApiParam(value = "회원가입 요청 정보", required = true) @Valid UserSignUpRequest userSignUpRequest) {
        String result = userService.insertUser(userSignUpRequest);
        if (result.equals("fail")) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409,"회원가입 실패"));
        }

        return ResponseEntity.ok(BaseResponseBody.of(200,"회원가입 성공"));
    }

//    @ApiOperation("이메일 중복 검사")
//    @GetMapping("/duplicate-email/{userEmail}")
//    public ResponseEntity<BaseResponseBody> checkDuplicateUserId(@PathVariable("userEmail") String userEmail) {
//        String result = userService.checkDuplicateUserEmail(userEmail);
//        if (result.equals("fail")) {
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"이메일 중복"));
//        }
//        return ResponseEntity.ok(BaseResponseBody.of(200,"이메일 사용 가능"));
//    }

    @GetMapping("/duplicate-nickname/{userNickname}")
    @ApiOperation(value = "닉네임 중복 검사", notes = "입력한 닉네임을 통해 중복 검사 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginResponse.class),
            @ApiResponse(code = 409, message = "중복 검사 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> checkDuplicateUserNickName(@PathVariable("userNickname") String userNickname) {
        String result = userService.checkDuplicateUserNickname(userNickname);
        if (result.equals("fail")) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409,"닉네임 중복"));
        }
        return ResponseEntity.ok(BaseResponseBody.of(200,"닉네임 사용 가능"));
    }

}
