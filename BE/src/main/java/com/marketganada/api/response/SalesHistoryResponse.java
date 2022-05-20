package com.marketganada.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Payment;
import lombok.Getter;
import lombok.Setter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Getter
@Setter
public class SalesHistoryResponse {
    @JsonFormat(timezone = "Asia/Seoul")
    List<Map<String, Object>> salesHistory;
    @JsonFormat(timezone = "Asia/Seoul")
    List<Map<String, Object>> selling;

    public static SalesHistoryResponse of(List<Payment> paymentList,List<Auction> sellingList) {
        SalesHistoryResponse res = new SalesHistoryResponse();
        List<Map<String, Object>> salesHistory = new ArrayList<>();
        for(Payment payment : paymentList){
            Map<String,Object> salesInfo = new HashMap<>();
            salesInfo.put("paymentId",payment.getPaymentId());
            salesInfo.put("productName",payment.getAuction().getProduct().getProductName());
            salesInfo.put("productBrand",payment.getAuction().getProduct().getProductBrand());
            salesInfo.put("tradeDate",payment.getTradeDate());
            salesInfo.put("price",payment.getPrice());
            salesInfo.put("courier",payment.getCourier());
            salesInfo.put("status",payment.getStatus());
            salesInfo.put("trackingNum",payment.getTrackingNum());
            salesInfo.put("titleImageUrl",payment.getAuction().getTitleImageUrl());
            salesHistory.add(salesInfo);
        }
        res.setSalesHistory(salesHistory);

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
        return res;

    }
}
