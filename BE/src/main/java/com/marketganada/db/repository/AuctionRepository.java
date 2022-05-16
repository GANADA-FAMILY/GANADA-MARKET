package com.marketganada.db.repository;

import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuctionRepository extends JpaRepository<Auction,Long> {
    @EntityGraph(attributePaths = {"product","user","likes","auctionImgs","payment"}, type = EntityGraph.EntityGraphType.LOAD)
    List<Auction> findByProductIn(List<Product> product, Pageable pageable);
}
