package com.marketganada.db.repository;

import com.marketganada.db.entity.Auction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AuctionRepository extends JpaRepository<Auction,Long>, JpaSpecificationExecutor<Auction> {
//    @EntityGraph(attributePaths = {"product","user","likes","auctionImgs","payment"}, type = EntityGraph.EntityGraphType.LOAD)
//    List<Auction> findByProductIn(List<Product> product, Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"product","user","likes","auctionImgs","payment"}, type = EntityGraph.EntityGraphType.LOAD)
    Page<Auction> findAll(Specification<Auction> spec, Pageable pageable);
}
