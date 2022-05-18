package com.marketganada.api.response;

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
    List<Map<String, Object>> auctionList;

    public static LikeAuctionListResponse of(List<Likes> likesList) {
        LikeAuctionListResponse res = new LikeAuctionListResponse();

        List<Map<String, Object>> auctionList = new ArrayList<>();

        //현재시간 Date
        Date curDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        try {
            curDate = dateFormat.parse(dateFormat.format(curDate));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        long curDateTime = curDate.getTime();
        System.out.println("현재시간 : " + curDate);
        System.out.println("현재시간 : " + curDateTime);

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

            long time = (curDateTime - reqDateTime) / (60000*24);
            System.out.println("요청시간 : " + reqDate);
            System.out.println("요청시간 : " + reqDateTime);
            System.out.println("경과시간 : " + time);
            System.out.println("그냥 : " + like.getAuction().getStartTime());
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



