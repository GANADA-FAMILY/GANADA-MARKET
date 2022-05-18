package com.marketganada.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.marketganada.common.KakaoPayApprovalVO;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@ApiModel("KakaoPaySuccessResponse")
public class KakaoPaySuccessResponse {
    @JsonFormat(timezone = "Asia/Seoul")
    Date created_at;
    String item_name;
    Integer quantity;
    Integer price;
    String payment_method_type;

    public static KakaoPaySuccessResponse of (KakaoPayApprovalVO kakaoPayApprovalVO){

        KakaoPaySuccessResponse res = new KakaoPaySuccessResponse();

        res.setCreated_at(kakaoPayApprovalVO.getCreated_at());
        res.setItem_name(kakaoPayApprovalVO.getItem_name());
        res.setQuantity(kakaoPayApprovalVO.getQuantity());
        res.setPrice(kakaoPayApprovalVO.getAmount().getTotal());
        res.setPayment_method_type(kakaoPayApprovalVO.getPayment_method_type());

        return res;
    }



}
