package com.marketganada.db.repository;

import com.marketganada.db.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRepository extends JpaRepository<Auction,Long> {
}
