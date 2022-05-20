package com.marketganada.api.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.marketganada.api.response.UserInfoResponse;
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
@ApiModel("SellingListResonse")
public class SellingListResponse {

    @JsonFormat(timezone = "Asia/Seoul")
    List<Map<String, Object>> selling;

    public static SellingListResponse of(List<Auction> sellingList) {
        SellingListResponse res = new SellingListResponse();

        Date curDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss", Locale.KOREA);
        dateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
        try {
            curDate = dateFormat.parse(dateFormat.format(curDate));
        } catch (
                ParseException e) {
            e.printStackTrace();
        }
        long curDateTime = curDate.getTime();
        List<Map<String, Object>> selling = new ArrayList<>();
        for(
                Auction auction : sellingList){
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
    };

}
