package com.marketganada.api.response;

import com.marketganada.common.KakaoPayReadyVO;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("PaymentInsertResponse")
public class PaymentInsertResponse {

    String tid;
    String orderId;
    String redirectURL;

    public static PaymentInsertResponse of(KakaoPayReadyVO kakaoPayReadyVO,String orderId){
        PaymentInsertResponse res = new PaymentInsertResponse();

        res.setTid(kakaoPayReadyVO.getTid());
        res.setOrderId(orderId);
        res.setRedirectURL(kakaoPayReadyVO.getNext_redirect_pc_url());

        return res;
    }
}
