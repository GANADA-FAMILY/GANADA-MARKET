package com.marketganada.api.controller;

import com.marketganada.api.request.KakaoPaySuccessRequest;
import com.marketganada.api.request.PaymentInsertRequest;
import com.marketganada.api.request.TrackingNumUpdateRequest;
import com.marketganada.api.response.*;
import com.marketganada.api.service.PaymentService;
import com.marketganada.common.KakaoPayApprovalVO;
import com.marketganada.common.KakaoPayReadyVO;
import com.marketganada.config.auth.GanadaUserDetails;
import com.marketganada.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.Map;

@Api(value = "결제 API", tags = {"Payment."})
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @PostMapping()
    @ApiOperation(value = "결제정보 등록", notes = "데이터를 입력받아 결제 정보를 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = PaymentInsertResponse.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 409, message = "이미 결제 정보 있음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity insertPayment(@ApiIgnore Authentication authentication,
                                        @Valid @RequestBody PaymentInsertRequest paymentInsertRequest) {
        if(paymentInsertRequest.getPrice()<=0){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        if (paymentInsertRequest.getPaymentMethod().equals("kakaopay")) {

            Map<String,Object> res = paymentService.insertPayment(paymentInsertRequest, user);
            String insert = (String) res.get("insert");
            String paymentId = String.valueOf(res.get("paymentId"));
            KakaoPayReadyVO kakaoPayReadyVO = (KakaoPayReadyVO) res.get("kakaoPayReady");

            if(insert.equals("conflict")){
                System.out.println("중복");
                return new ResponseEntity(HttpStatus.CONFLICT);
            }else if(insert.equals("fail")){
                System.out.println("페일");
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
            }

            if (kakaoPayReadyVO == null || kakaoPayReadyVO.getNext_redirect_pc_url().equals("")) {
                System.out.println("널or빈값");
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
            }
            return ResponseEntity.ok(PaymentInsertResponse.of(kakaoPayReadyVO, paymentId));
        }

        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/kakaoPaySuccess")
    @ApiOperation(value = "카카오페이 결제 완료 ", notes = "카카오페이 결제를 완료하고 결제 상태를 입금 확인으로 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = KakaoPaySuccessResponse.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity kakaoPaySuccess(@ApiIgnore Authentication authentication, @Valid @RequestBody KakaoPaySuccessRequest kakaoPaySuccessRequest) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        KakaoPayApprovalVO kakaoPayApprovalVO= paymentService.kakaoPayInfo(kakaoPaySuccessRequest, user);
        paymentService.successPayment(Long.valueOf(kakaoPaySuccessRequest.getOrderId()));

        return ResponseEntity.ok(KakaoPaySuccessResponse.of(kakaoPayApprovalVO));
    }

    @PutMapping("/tracking/{paymentId}")
    @ApiOperation(value = "운송장 번호 입력", notes = "상태값이 결제완료라면 운송장 번호를 입력받아 상태를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = KakaoPaySuccessResponse.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity updateTrackingNum(@ApiIgnore Authentication authentication,
                                            @PathVariable("paymentId") Long paymentId,
                                            @Valid @RequestBody TrackingNumUpdateRequest request) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        String res = paymentService.updateTrackingNum(paymentId,request,user);
        if(res.equals("success")){
            return new ResponseEntity(HttpStatus.CREATED);
        }else if(res.equals("Unauthorized")){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);

    }

    @PutMapping("/confirm/{paymentId}")
    @ApiOperation(value = "구매확정", notes = "상태값을 구매를 확정으로 변경하고 상품의 거래기록을 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = KakaoPaySuccessResponse.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity confirmPayment(@ApiIgnore Authentication authentication,
                                            @PathVariable("paymentId") Long paymentId) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        String res = paymentService.confirmPayment(paymentId, user);
        if(res.equals("success")){
            return new ResponseEntity(HttpStatus.CREATED);
        }else if(res.equals("Unauthorized")){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);

    }

}
