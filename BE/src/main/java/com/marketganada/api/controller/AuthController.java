package com.marketganada.api.controller;


import com.marketganada.api.request.UserLoginRequest;
import com.marketganada.api.request.UserPwFindRequest;
import com.marketganada.api.request.UserSignUpRequest;
import com.marketganada.api.response.BaseResponseBody;
import com.marketganada.api.response.UserEmailFindResponse;
import com.marketganada.api.response.UserLoginResponse;
import com.marketganada.api.service.SmsService;
import com.marketganada.api.service.UserService;
import com.marketganada.config.auth.JwtTokenUtil;
import com.marketganada.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private SmsService smsService;

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>아이디</strong>와 <strong>패스워드를</strong> 통해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginResponse.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "존재하지 않는 아이디"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity login(@RequestBody @ApiParam(value = "로그인 요청 정보", required = true) @Valid UserLoginRequest userLoginRequest) {
        String result = userService.login(userLoginRequest);
        if (result.equals("fail1")) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }else if(result.equals("fail2")){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(UserLoginResponse.of(JwtTokenUtil.getToken(userLoginRequest.getUserEmail())));
    }

    @PostMapping("/signup")
    @ApiOperation(value = "회원가입", notes = "입력한 회원 정보 를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 409, message = "회원가입 실패(중복)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity signup(@RequestBody @ApiParam(value = "회원가입 요청 정보", required = true) @Valid UserSignUpRequest userSignUpRequest) {
        String result = userService.insertUser(userSignUpRequest);
        if (result.equals("fail")) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }

        return new ResponseEntity(HttpStatus.CREATED);

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
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 409, message = "중복 검사 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity checkDuplicateUserNickName(@PathVariable("userNickname") String userNickname) {
        String result = userService.checkDuplicateUserNickname(userNickname);
        if (result.equals("fail")) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    //크림은 전화번호가 유니크키 인거 같은데?
    @GetMapping("/find-email/{userPhone}")
    @ApiOperation(value = "이메일 찾기", notes = "입력한 전화번호를 통해 이메일을 찾는다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "이메일 찾기 성공", response = UserEmailFindResponse.class),
            @ApiResponse(code = 404, message = "이메일 찾기 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity findUserEmail(@PathVariable("userPhone") String userPhone){
        List<User> userList = userService.getUserListByUserPhone(userPhone);

        if(userList.size()==0){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(UserEmailFindResponse.of(userList));

    }


    @PutMapping("/find-pw")
    @ApiOperation(value = "비밀번호 찾기", notes = "전화번호와 이메일을 입력받아 비밀번호를 문자로 발송한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "비밀번호 찾기 성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "이메일 일치 하는 유저의 전화번호와 같지 않음"),
            @ApiResponse(code = 404, message = "이메일 일치 하는 유저 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity findUserPw( @ApiParam(value = "비밀번호 찾기 요청 정보", required = true)
                                                                  @Valid @RequestBody UserPwFindRequest userPwFindRequest){
        Optional<User> user = userService.getUserByUserEmail(userPwFindRequest.getUserEmail());
        if(user.isPresent()){
            System.out.println("이메일"+user.get().getUserEmail());

            String result = smsService.sendUserPw(user.get(),userPwFindRequest);
            if(result.equals("success")){
                return new ResponseEntity(HttpStatus.CREATED);
            }else{
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

    }

}
