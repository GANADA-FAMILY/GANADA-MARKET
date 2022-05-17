package com.marketganada.api.response;

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
public class AuctionListResponse extends BaseResponseBody {
    List<Auctions> auctionList;

    public static AuctionListResponse of(int statusCode, String message, List<Auction> auctions) {
        AuctionListResponse res = new AuctionListResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAuctionList(new ArrayList<>());

        if(auctions == null)
            return res;

        for(Auction a : auctions) {
            res.getAuctionList().add(Auctions.builder()
                    .auction(a)
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
        String seller;
        Date startTime;
        int startPrice;
        int cycle;
        int depreciation;
        Date endTime;

        @Builder
        public Auctions(Auction auction) {
            auctionId = auction.getAuctionId();
            titleImageUrl = auction.getTitleImageUrl();
            product = Products.builder().product(auction.getProduct()).build();
            auctionTitle = auction.getAuctionTitle();
            seller = auction.getUser().getUserNickname();
            startPrice = auction.getStartPrice();
            cycle = auction.getCycle();
            depreciation = auction.getDepreciation();
            startTime = auction.getStartTime();
            endTime = auction.getEndTime();
        }
    }

    @Getter
    static class Products {
        String productName;
        String productBrand;

        @Builder
        public Products(Product product) {
            productName = product.getProductName();
            productBrand = product.getProductBrand();
        }
    }
}
