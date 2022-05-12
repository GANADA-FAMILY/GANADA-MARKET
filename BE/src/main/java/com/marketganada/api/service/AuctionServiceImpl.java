package com.marketganada.api.service;

import com.marketganada.api.request.AuctionInsertRequest;
import com.marketganada.api.request.LikeRequest;
import com.marketganada.common.ProductSpecification;
import com.marketganada.db.entity.*;
import com.marketganada.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("AuctionService")
public class AuctionServiceImpl implements AuctionService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    AuctionRepository auctionRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    LikesRepository likesRepository;

    @Autowired
    CategoryLargeRepository categoryLargeRepository;
    @Autowired
    CategoryMiddleRepository categoryMiddleRepository;
    @Autowired
    CategorySmallRepository categorySmallRepository;

    @Override
    public String insertAuction(AuctionInsertRequest auctionInsertRequest, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent())
            throw new IllegalArgumentException("user not found");

        Optional<Product> product = productRepository.findById(auctionInsertRequest.getProductId());
        if(!product.isPresent())
            throw new IllegalArgumentException("product not found");

        Auction auction = Auction.builder()
                .user(user.get())
                .auctionTitle(auctionInsertRequest.getAuctionTitle())
                .endTime(auctionInsertRequest.getEndTime())
                .product(product.get())
                .startPrice(auctionInsertRequest.getStartPrice())
                .description(auctionInsertRequest.getDescription())
                .cycle(auctionInsertRequest.getCycle())
                .depreciation(auctionInsertRequest.getDepreciation())
                .build();
        auctionRepository.save(auction);

        return "success";
    }

    @Override
    public Auction getAuctionById(Long auctionId) {
        Optional<Auction> auction = auctionRepository.findById(auctionId);

        if(!auction.isPresent())
            throw new IllegalArgumentException("not found");

        return auction.get();
    }

    @Override
    public String deleteAuction(Long auctionId) {
        Optional<Auction> auction = auctionRepository.findById(auctionId);

        if(!auction.isPresent())
            throw new IllegalArgumentException("not found");

        auctionRepository.deleteById(auctionId);

        return "success";
    }

    @Override
    public String insertAuctionLike(LikeRequest likeRequest, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent())
            throw new IllegalArgumentException("user not found");

        Optional<Auction> auction = auctionRepository.findById(likeRequest.getAuctionId());
        if(!auction.isPresent())
            throw new IllegalArgumentException("auction not found");

        Likes likes = Likes.builder()
                .auction(auction.get())
                .user(user.get())
                .build();

        likesRepository.save(likes);

        Auction target = auction.get();
        target.setLikeCnt(target.getLikeCnt()+1);
        auctionRepository.save(target);

        return "success";
    }

    @Override
    public String deleteAuctionLike(Long auctionId, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent())
            throw new IllegalArgumentException("user not found");

        Optional<Auction> auction = auctionRepository.findById(auctionId);
        if(!auction.isPresent())
            throw new IllegalArgumentException("auction not found");

        LikesId likesId = new LikesId();
        likesId.setAuction(auctionId);
        likesId.setUser(userId);

        likesRepository.deleteById(likesId);

        Auction target = auction.get();
        target.setLikeCnt(target.getLikeCnt()-1);
        auctionRepository.save(target);

        return "success";
    }

    @Override
    public List<Auction> getAuctionPhoneList(String brand, String model, String save, Pageable pageable) {
        Specification<Product> spec = (root, query, criteriaBuilder) -> null;

        spec = spec.and(ProductSpecification.equalCategoryLargeName("휴대폰"));

        if(!brand.equals("ALL"))
            spec = spec.and(ProductSpecification.equalProductBrand(brand));
        if(!model.equals("ALL"))
            spec = spec.and(ProductSpecification.equalProductName(model));
        if(!save.equals("ALL"))
            spec = spec.and(ProductSpecification.equalCategorySmallName(save));

        List<Product> products = productRepository.findAll(spec);

        List<Auction> auctions = auctionRepository.findByProductIn(products, pageable);

        return auctions;
    }

    @Override
    public List<Auction> getAuctionEarphoneList(String brand, String model, Pageable pageable) {
        Specification<Product> spec = (root, query, criteriaBuilder) -> null;

        spec = spec.and(ProductSpecification.equalCategoryLargeName("이어폰"));

        if(!brand.equals("ALL"))
            spec = spec.and(ProductSpecification.equalProductBrand(brand));
        if(!model.equals("ALL"))
            spec = spec.and(ProductSpecification.equalProductName(model));

        List<Product> products = productRepository.findAll(spec);

        List<Auction> auctions = auctionRepository.findByProductIn(products, pageable);

        return auctions;
    }
}
