package com.marketganada.api.response;

import com.marketganada.db.entity.Payment;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class SalesHistoryResponse {
    List<Map<String, Object>> orderHistory;

    public static SalesHistoryResponse of(List<Payment> paymentList) {
        SalesHistoryResponse res = new SalesHistoryResponse();
        List<Map<String, Object>> orderHistory = new ArrayList<>();
        for(Payment payment : paymentList){
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
        return res;

    }
}
