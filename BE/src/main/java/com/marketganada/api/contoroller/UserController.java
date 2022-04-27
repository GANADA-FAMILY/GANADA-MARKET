package com.marketganada.api.contoroller;

import com.marketganada.api.request.UserNicknameUpdateRequest;
import com.marketganada.api.request.UserPwUpdateRequest;
import com.marketganada.api.response.BaseResponseBody;
import com.marketganada.api.response.UserInfoResponse;
import com.marketganada.api.response.UserLoginResponse;
import com.marketganada.api.service.UserService;
import com.marketganada.common.auth.GanadaUserDetails;
import com.marketganada.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "유저 API", tags = {"User."})
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @ApiOperation("jwt 테스트")
    @GetMapping("/test")
    public ResponseEntity<? extends BaseResponseBody> testJWT(@ApiIgnore Authentication authentication) {


        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "토큰 인증 성공"));
    }

    @GetMapping
    @ApiOperation(value = "회원 정보 조회", notes = " 토큰을 통해 <strong>회원 정보 조회</strong>를 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginResponse.class),
            @ApiResponse(code = 401, message = "회원가입 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getUserInfo(@ApiIgnore Authentication authentication) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        return ResponseEntity.status(200).body(UserInfoResponse.of(200, "회원 정보 조회 성공", user));
    }

    @PutMapping("/nickname")
    @ApiOperation(value = "닉네임 변경", notes = " 입력한 닉네임으로 닉네임을 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginResponse.class),
            @ApiResponse(code = 409, message = "중복 검사 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateUserNickname(@ApiIgnore Authentication authentication,
                                                                         @RequestBody UserNicknameUpdateRequest userNicknameUpdateRequest) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        String res = userService.updateUserNickname(userNicknameUpdateRequest, user);
        if(res.equals("fail")){
            return ResponseEntity.status(401).body(BaseResponseBody.of(409,"닉네임 변경 실패"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "닉네임 변경 성공"));
    }

    @PutMapping("/pw")
    @ApiOperation(value = "비밀번호 변경", notes = " 현재 비밀번호와 새 비밀번호를 입력받아 확인하고 비밀번호를 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginResponse.class),
            @ApiResponse(code = 401, message = "현재 비밀번호 불일치"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateUserPw(@ApiIgnore Authentication authentication,
                                                                   @RequestBody UserPwUpdateRequest userPwUpdateRequest) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        String res = userService.updateUserPw(userPwUpdateRequest, user);
        if(res.equals("fail")){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"비밀번호 변경 실패"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "비밀번호 변경 성공"));
    }


}
