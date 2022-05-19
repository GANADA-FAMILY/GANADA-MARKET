package com.marketganada.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.AuctionImg;
import com.marketganada.db.entity.Product;
import com.marketganada.db.entity.ProductHistory;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class AuctionDetailResponse {
    Auctions auction;

    public static AuctionDetailResponse of(Auction auction, boolean isLiked, boolean isMine, int recentPrice) {
        AuctionDetailResponse res = new AuctionDetailResponse();
        if(auction != null)
            res.setAuction(Auctions.builder()
                    .auction(auction)
                    ._isLiked(isLiked)
                    ._isMine(isMine)
                    ._recentPrice(recentPrice)
                    .build());

        return res;
    }

    @Getter
    static class Auctions {
        Long auctionId;
        List<String> auctionImgs;
        Products product;
        List<ProductHistories> productHistory;
        String auctionTitle;
        String auctionDesc;
        String seller;
        Date startTime;
        int startPrice;
        int cycle;
        int depreciation;
        Date endTime;
        Boolean auctionStatus;
        Boolean isLiked;
        Boolean isMine;
        int likeCnt;

        @Builder
        public Auctions(Auction auction, Boolean _isLiked, Boolean _isMine, int _recentPrice) {
            auctionId = auction.getAuctionId();
            product = Products.builder().product(auction.getProduct())._recentPrice(_recentPrice).build();
            auctionTitle = auction.getAuctionTitle();
            auctionDesc = auction.getDescription();
            seller = auction.getUser().getUserNickname();
            startPrice = auction.getStartPrice();
            cycle = auction.getCycle();
            depreciation = auction.getDepreciation();
            startTime = auction.getStartTime();
            endTime = auction.getEndTime();
            auctionStatus = auction.isAuctionStatus();
            isLiked = _isLiked;
            isMine = _isMine;
            likeCnt = auction.getLikeCnt();

            auctionImgs = new ArrayList<>();
            for(AuctionImg a : auction.getAuctionImgs()) {
                auctionImgs.add(a.getImgUrl());
            }

            productHistory = new ArrayList<>();
            for(ProductHistory p : auction.getProduct().getProductHistories()) {
                productHistory.add(ProductHistories.builder().productHistory(p).build());
            }
        }
    }

    @Getter
    static class Products {
        String productName;
        String productBrand;
        String productModel;
        @JsonFormat(timezone = "Asia/Seoul")
        Date releaseDate;
        int recentPrice;

        @Builder
        public Products(Product product, int _recentPrice) {
            productName = product.getProductName();
            productBrand = product.getProductBrand();
            releaseDate = product.getReleaseDate();
            productModel = product.getDeviceId();
            recentPrice = _recentPrice;
        }
    }

    @Getter
    static class ProductHistories {
        @JsonFormat(timezone = "Asia/Seoul")
        Date historyDate;
        int historyPrice;

        @Builder
        public ProductHistories(ProductHistory productHistory) {
            historyDate = productHistory.getHistoryDate();
            historyPrice = productHistory.getHistoryPrice();
        }
    }
}
