package com.marketganada.api.service;

import com.marketganada.api.request.AuctionInsertRequest;
import com.marketganada.api.request.EarphoneListRequest;
import com.marketganada.api.request.PhoneListRequest;
import com.marketganada.db.entity.Auction;

import java.util.List;

public class AuctionServiceImpl implements AuctionService {
    @Override
    public String insertAuction(AuctionInsertRequest auctionInsertRequest) {
        return null;
    }

    @Override
    public List<Auction> getAuctionById(Long auctionId) {
        return null;
    }

    @Override
    public String deleteAuction(Long auctionId) {
        return null;
    }

    @Override
    public String insertAuctionLike(Long auctionId) {
        return null;
    }

    @Override
    public String deleteAuctionLike(Long auctionId) {
        return null;
    }

    @Override
    public String getAuctionPhoneList(PhoneListRequest phoneListRequest) {
        return null;
    }

    @Override
    public String getAuctionEarphoneList(EarphoneListRequest earphoneListRequest) {
        return null;
    }
}
