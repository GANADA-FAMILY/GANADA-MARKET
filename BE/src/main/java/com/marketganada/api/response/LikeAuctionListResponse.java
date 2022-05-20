package com.marketganada.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Likes;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Getter
@Setter
public class LikeAuctionListResponse {
    @JsonFormat(timezone = "Asia/Seoul")
    List<Map<String, Object>> auctionList;

    public static LikeAuctionListResponse of(List<Likes> likesList) {
        LikeAuctionListResponse res = new LikeAuctionListResponse();

        List<Map<String, Object>> auctionList = new ArrayList<>();

        //현재시간 Date
        Date curDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss",Locale.KOREA);
        dateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
        try {
            curDate = dateFormat.parse(dateFormat.format(curDate));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        long curDateTime = curDate.getTime();

        for(Likes like : likesList){
            Map<String,Object> auctionInfo = new HashMap<>();
            auctionInfo.put("auctionId",like.getAuction().getAuctionId());
            auctionInfo.put("auctionTitle",like.getAuction().getAuctionTitle());
            auctionInfo.put("endTime",like.getAuction().getEndTime());
            auctionInfo.put("status",like.getAuction().isAuctionStatus());
            auctionInfo.put("auctionImg",like.getAuction().getTitleImageUrl());

            Date reqDate = like.getAuction().getStartTime();

            try {
                reqDate = dateFormat.parse(dateFormat.format(reqDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            long reqDateTime = reqDate.getTime();

            long time = (curDateTime - reqDateTime) / (60000*60);

            //현재가격 = 시작가 - (감가 * ((현재시간 - 시작시간)  / 사이클)  )
            //                          190000                    - (      5000                           *         ((23시 - 01시) / 사이클)) )
            Long currentPrice = like.getAuction().getStartPrice() - ( like.getAuction().getDepreciation() * ( ( time )/like.getAuction().getCycle() ) );

            auctionInfo.put("currentPrice",currentPrice);


            auctionList.add(auctionInfo);
        }

        res.setAuctionList(auctionList);

        return res;
    }
}



