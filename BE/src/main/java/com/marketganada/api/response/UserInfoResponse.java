package com.marketganada.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Payment;
import com.marketganada.db.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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
    @JsonFormat(timezone = "Asia/Seoul")
    List<Map<String, Object>> selling;

    public static UserInfoResponse of(User user, List<Payment> orderList, List<Payment> salesList, List<Auction> sellingList) {
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
            orderInfo.put("courier",payment.getCourier());
            orderInfo.put("titleImageUrl",payment.getAuction().getTitleImageUrl());
            orderHistory.add(orderInfo);
        }
        res.setOrderHistory(orderHistory);

        Date curDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss",Locale.KOREA);
        dateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
        try {
            curDate = dateFormat.parse(dateFormat.format(curDate));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        long curDateTime = curDate.getTime();
        List<Map<String, Object>> selling = new ArrayList<>();
        for(Auction auction : sellingList){
            Map<String,Object> sellingInfo = new HashMap<>();
            sellingInfo.put("auctionId",auction.getAuctionId());
            sellingInfo.put("titleImageUrl",auction.getTitleImageUrl());
            sellingInfo.put("productName",auction.getProduct().getProductName());
            sellingInfo.put("productBrand",auction.getProduct().getProductBrand());
            sellingInfo.put("auctionTitle",auction.getAuctionTitle());
            Date reqDate = auction.getStartTime();

            try {
                reqDate = dateFormat.parse(dateFormat.format(reqDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            long reqDateTime = reqDate.getTime();

            long time = (curDateTime - reqDateTime) / (60000*60);
            Long currentPrice = auction.getStartPrice() - ( auction.getDepreciation() * ( ( time )/ auction.getCycle() ) );
            sellingInfo.put("currentPrice",currentPrice);
            sellingInfo.put("endTime",auction.getEndTime());



            selling.add(sellingInfo);
        }
        res.setSelling(selling);

        List<Map<String, Object>> salesHistory = new ArrayList<>();
        for(Payment payment : salesList){
            Map<String,Object> salesInfo = new HashMap<>();
            salesInfo.put("paymentId",payment.getPaymentId());
            salesInfo.put("productName",payment.getAuction().getProduct().getProductName());
            salesInfo.put("productBrand",payment.getAuction().getProduct().getProductBrand());
            salesInfo.put("tradeDate",payment.getTradeDate());
            salesInfo.put("price",payment.getPrice());
            salesInfo.put("status",payment.getStatus());
            salesInfo.put("courier",payment.getCourier());
            salesInfo.put("trackingNum",payment.getTrackingNum());
            salesInfo.put("titleImageUrl",payment.getAuction().getTitleImageUrl());
            salesHistory.add(salesInfo);
        }
        res.setSalesHistory(salesHistory);

        return res;
    }
}
