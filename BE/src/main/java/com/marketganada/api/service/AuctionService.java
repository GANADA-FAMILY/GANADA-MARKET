package com.marketganada.api.service;

import com.marketganada.api.request.AuctionInsertRequest;
import com.marketganada.api.request.EarphoneListRequest;
import com.marketganada.api.request.PhoneListRequest;
import com.marketganada.db.entity.Auction;

import java.util.List;

public interface AuctionService {
    public String insertAuction(AuctionInsertRequest auctionInsertRequest);
    public List<Auction> getAuctionById(Long auctionId);
    public String deleteAuction(Long auctionId);
    public String insertAuctionLike(Long auctionId);
    public String deleteAuctionLike(Long auctionId);
    public String getAuctionPhoneList(PhoneListRequest phoneListRequest);
    public String getAuctionEarphoneList(EarphoneListRequest earphoneListRequest);
}
