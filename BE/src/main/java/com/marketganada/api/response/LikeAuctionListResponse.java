package com.marketganada.api.response;

import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Likes;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class LikeAuctionListResponse extends BaseResponseBody{
    Map<String,Object> data;

    public static LikeAuctionListResponse of(int statusCode, String message, List<Likes> likesList) {
        LikeAuctionListResponse res = new LikeAuctionListResponse();
        Map<String,Object> data = new HashMap<>();
        List<Map<String, Object>> auctionList = new ArrayList<>();

        res.setStatusCode(statusCode);
        res.setMessage(message);

        for(Likes like : likesList){
            Map<String,Object> auctionInfo = new HashMap<>();
            auctionInfo.put("auctionId",like.getAuction().getAuctionId());
            auctionInfo.put("auctionTitle",like.getAuction().getAuctionTitle());
            auctionInfo.put("endTime",like.getAuction().getEndTime());
            auctionInfo.put("status",like.getAuction().isAuctionStatus());

            auctionList.add(auctionInfo);
        }

        data.put("auctionList",auctionList);
        res.setData(data);

        return res;
    }
}



