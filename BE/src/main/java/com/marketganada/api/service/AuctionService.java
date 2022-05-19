package com.marketganada.api.service;

import com.marketganada.api.request.AuctionInsertRequest;

import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Likes;
import com.marketganada.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AuctionService {
    public String insertAuction(AuctionInsertRequest auctionInsertRequest, List<MultipartFile> auctionImages, User user);
    public Auction getAuctionById(Long auctionId);
    public boolean isThisAuctionMine(Auction auction, User user);
    public boolean isThisAuctionLiked(Auction auction, User user);
    public String deleteAuction(Long auctionId, User user);
    public String insertAuctionLike(Long auctionId, User user);
    public String deleteAuctionLike(Long auctionId, User user);
    public Page<Auction> getRecentAuctionList(Pageable pageable);
    public Page<Auction> getAuctionPhoneList(List<String> brand, List<String> model, List<String> save, Pageable pageable);
    public Page<Auction> getAuctionEarphoneList(List<String> brand, List<String> model, Pageable pageable);
    List<Likes> getLikeAuctionList(User user);
    Long getAuctionCnt(String category, List<String> brand, List<String> model, List<String> save);
}
