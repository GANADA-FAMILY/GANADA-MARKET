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
public class LikeAuctionListResponse {
    List<Map<String, Object>> auctionList;

    public static LikeAuctionListResponse of(List<Likes> likesList) {
        LikeAuctionListResponse res = new LikeAuctionListResponse();

        List<Map<String, Object>> auctionList = new ArrayList<>();

        for(Likes like : likesList){
            Map<String,Object> auctionInfo = new HashMap<>();
            auctionInfo.put("auctionId",like.getAuction().getAuctionId());
            auctionInfo.put("auctionTitle",like.getAuction().getAuctionTitle());
            auctionInfo.put("endTime",like.getAuction().getEndTime());
            auctionInfo.put("status",like.getAuction().isAuctionStatus());

            auctionList.add(auctionInfo);
        }

        res.setAuctionList(auctionList);

        return res;
    }
}



