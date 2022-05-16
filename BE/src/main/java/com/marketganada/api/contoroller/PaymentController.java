package com.marketganada.api.contoroller;

import com.marketganada.api.request.UserLoginRequest;
import com.marketganada.api.response.BaseResponseBody;
import com.marketganada.api.response.UserLoginResponse;
import com.marketganada.api.service.KaKaoPayService;
import com.marketganada.config.auth.GanadaUserDetails;
import com.marketganada.config.auth.JwtTokenUtil;
import com.marketganada.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@Api(value = "결제 API", tags = {"Payment."})
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    KaKaoPayService kaKaoPayService;

    @PostMapping()
    public ResponseEntity<BaseResponseBody> kakaoPayReady( @ApiIgnore Authentication authentication) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        String redirect ="redirect:" + kaKaoPayService.kakaoPayReady();
        return null;
    }




}
