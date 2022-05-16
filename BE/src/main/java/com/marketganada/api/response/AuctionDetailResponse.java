package com.marketganada.api.response;

import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Product;
import com.marketganada.db.entity.ProductHistory;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class AuctionDetailResponse extends BaseResponseBody {
    Auctions auction;

    public static AuctionDetailResponse of(int statusCode, String message, Auction auction) {
        AuctionDetailResponse res = new AuctionDetailResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAuction(Auctions.builder().auction(auction).build());

        return res;
    }

    @Getter
    static class Auctions {
        Long auctionId;
        String auctionImgs;
        Products product;
        ProductHistories productHistory;
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
        public Auctions(Auction auction, Boolean _isLiked, Boolean _isMine) {
            auctionId = auction.getAuctionId();
            auctionImgs = auction.getAuctionImgs().toString();
            product = Products.builder().product(auction.getProduct()).build();
            productHistory = ProductHistories.builder().product(auction.getProduct()).build();
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
        }
    }

    @Getter
    static class Products {
        String productName;
        String productBrand;
        Date releaseDate;
        int recentPrice;

        @Builder
        public Products(Product product) {
            productName = product.getProductName();
            productBrand = product.getProductBrand();
            releaseDate = product.getReleaseDate();
        }
    }

    @Getter
    static class ProductHistories {
        Date historyDate;
        int historyPrice;

        @Builder
        public ProductHistories(Product product) {
        }
    }
}
