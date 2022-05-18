package com.marketganada.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.marketganada.db.entity.Payment;
import com.marketganada.db.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ApiModel("UserInfoResponse")
public class UserInfoResponse {

    String userEmail;
    String userNickname;
    String userPhone;
    String profileImageUrl;
    String grade;
    @JsonFormat(timezone = "Asia/Seoul")
    List<Map<String, Object>> orderHistory;
    @JsonFormat(timezone = "Asia/Seoul")
    List<Map<String, Object>> salesHistory;

    public static UserInfoResponse of(User user, List<Payment> orderList, List<Payment> salesList) {
        UserInfoResponse res = new UserInfoResponse();

        StringBuffer sb = new StringBuffer(user.getUserPhone());
        sb.replace(3,8,"*****");
        
        res.setUserEmail(user.getUserEmail());
        res.setUserNickname(user.getUserNickname());
        res.setUserPhone(String.valueOf(sb));
        res.setProfileImageUrl(user.getProfileImageUrl());
        res.setGrade(user.getGrade());

        List<Map<String, Object>> orderHistory = new ArrayList<>();
        for(Payment payment : orderList){
            Map<String,Object> orderInfo = new HashMap<>();
            orderInfo.put("paymentId",payment.getPaymentId());
            orderInfo.put("productName",payment.getAuction().getProduct().getProductName());
            orderInfo.put("productBrand",payment.getAuction().getProduct().getProductBrand());
            orderInfo.put("tradeDate",payment.getTradeDate());
            orderInfo.put("price",payment.getPrice());
            orderInfo.put("status",payment.getStatus());
            orderInfo.put("trackingNum",payment.getTrackingNum());
            orderHistory.add(orderInfo);
        }
        res.setOrderHistory(orderHistory);

        List<Map<String, Object>> salesHistory = new ArrayList<>();
        for(Payment payment : salesList){
            Map<String,Object> salesInfo = new HashMap<>();
            salesInfo.put("paymentId",payment.getPaymentId());
            salesInfo.put("productName",payment.getAuction().getProduct().getProductName());
            salesInfo.put("productBrand",payment.getAuction().getProduct().getProductBrand());
            salesInfo.put("tradeDate",payment.getTradeDate());
            salesInfo.put("price",payment.getPrice());
            salesInfo.put("status",payment.getStatus());
            salesInfo.put("trackingNum",payment.getTrackingNum());
            salesHistory.add(salesInfo);
        }
        res.setSalesHistory(salesHistory);

        return res;
    }
}
