package com.marketganada.api.service;

import com.marketganada.api.request.AuctionInsertRequest;

import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Likes;
import com.marketganada.db.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AuctionService {
<<<<<<< HEAD
    public String insertAuction(AuctionInsertRequest auctionInsertRequest, List<MultipartFile> auctionImages, Long userId);
    public Auction getAuctionById(Long auctionId);
    public boolean isThisAuctionMine(Auction auction, Long userId);
    public boolean isThisAuctionLiked(Auction auction, Long userId);
    public String deleteAuction(Long auctionId, Long userId);
    public String insertAuctionLike(Long auctionId, Long userId);
    public String deleteAuctionLike(Long auctionId, Long userId);
    public List<Auction> getAuctionPhoneList(String brand, String model, String save, Pageable pageable);
    public List<Auction> getAuctionEarphoneList(String brand, String model, Pageable pageable);
=======
    String insertAuction(AuctionInsertRequest auctionInsertRequest, Long userId);
    Auction getAuctionById(Long auctionId);
    String deleteAuction(Long auctionId, Long userId);
    String insertAuctionLike(Long auctionId, Long userId);
    String deleteAuctionLike(Long auctionId, Long userId);
    List<Auction> getAuctionPhoneList(String brand, String model, String save, Pageable pageable);
    List<Auction> getAuctionEarphoneList(String brand, String model, Pageable pageable);
    List<Likes> getLikeAuctionList(User user);
>>>>>>> 9dc8d27a4593c68cc0b3161dbf72804658f3259b
}
