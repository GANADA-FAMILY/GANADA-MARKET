package com.marketganada.api.service;

import com.marketganada.api.request.AuctionInsertRequest;
import com.marketganada.api.request.EarphoneListRequest;
import com.marketganada.api.request.LikeRequest;
import com.marketganada.api.request.PhoneListRequest;
import com.marketganada.db.entity.Auction;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AuctionService {
    public String insertAuction(AuctionInsertRequest auctionInsertRequest, Long userId);
    public Auction getAuctionById(Long auctionId);
    public String deleteAuction(Long auctionId);
    public String insertAuctionLike(LikeRequest likeRequest, Long userId);
    public String deleteAuctionLike(Long auctionId, Long userId);
    public List<Auction> getAuctionPhoneList(String brand, String model, String save, Pageable pageable);
    public List<Auction> getAuctionEarphoneList(String brand, String model, Pageable pageable);
}
