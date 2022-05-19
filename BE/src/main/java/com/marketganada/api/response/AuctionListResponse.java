package com.marketganada.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Product;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class AuctionListResponse {
    Long auctionCnt;
    boolean isLast;
    List<Auctions> auctionList;

    public static AuctionListResponse of(List<Auction> auctions, List<Boolean> isLikes, Long cnt, boolean isLast) {
        AuctionListResponse res = new AuctionListResponse();
        res.setAuctionCnt(cnt);
        res.setLast(isLast);
        res.setAuctionList(new ArrayList<>());

        if(auctions == null)
            return res;

        for(int i = 0; i < auctions.size(); i++) {
            res.getAuctionList().add(Auctions.builder()
                    .auction(auctions.get(i))
                    ._isLiked(isLikes.size() > i ? isLikes.get(i) : false)
                    .build());
        }

        return res;
    }

    @Getter
    static class Auctions {
        Long auctionId;
        String titleImageUrl;
        Products product;
        String auctionTitle;
        String auctionDesc;
        String seller;
        @JsonFormat(timezone = "Asia/Seoul")
        Date startTime;
        int startPrice;
        int cycle;
        int depreciation;
        @JsonFormat(timezone = "Asia/Seoul")
        Date endTime;
        boolean isLiked;

        @Builder
        public Auctions(Auction auction, boolean _isLiked, int cnt) {
            auctionId = auction.getAuctionId();
            titleImageUrl = auction.getTitleImageUrl();
            product = Products.builder().product(auction.getProduct()).build();
            auctionTitle = auction.getAuctionTitle();
            auctionDesc = auction.getDescription();
            seller = auction.getUser().getUserNickname();
            startPrice = auction.getStartPrice();
            cycle = auction.getCycle();
            depreciation = auction.getDepreciation();
            startTime = auction.getStartTime();
            endTime = auction.getEndTime();
            isLiked = _isLiked;
        }
    }

    @Getter
    static class Products {
        String productName;
        String productBrand;
        String productModel;

        @Builder
        public Products(Product product) {
            productName = product.getProductName();
            productBrand = product.getProductBrand();
            productModel = product.getDeviceId();
        }
    }
}
