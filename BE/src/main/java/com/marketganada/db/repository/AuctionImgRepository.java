package com.marketganada.db.repository;

import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.AuctionImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuctionImgRepository extends JpaRepository<AuctionImg,Long> {
    List<AuctionImg> findByAuction(Auction auction);
}
