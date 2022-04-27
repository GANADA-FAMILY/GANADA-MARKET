package com.marketganada.api.contoroller;

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
    public ResponseEntity<? extends BaseResponseBody> updateUserNickname(@ApiIgnore Authentication authentication) {


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
    


}
