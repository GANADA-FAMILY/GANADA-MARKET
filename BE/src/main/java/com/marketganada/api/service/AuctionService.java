package com.marketganada.api.service;

import com.marketganada.api.request.AuctionInsertRequest;

import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Likes;
import com.marketganada.db.entity.User;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AuctionService {
    String insertAuction(AuctionInsertRequest auctionInsertRequest, Long userId);
    Auction getAuctionById(Long auctionId);
    String deleteAuction(Long auctionId, Long userId);
    String insertAuctionLike(Long auctionId, Long userId);
    String deleteAuctionLike(Long auctionId, Long userId);
    List<Auction> getAuctionPhoneList(String brand, String model, String save, Pageable pageable);
    List<Auction> getAuctionEarphoneList(String brand, String model, Pageable pageable);
    List<Likes> getLikeAuctionList(User user);
}
