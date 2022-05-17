package com.marketganada.api.service;

import com.marketganada.api.request.AuctionInsertRequest;
import com.marketganada.api.request.LikeRequest;
import com.marketganada.common.ProductSpecification;
import com.marketganada.db.entity.*;
import com.marketganada.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service("AuctionService")
public class AuctionServiceImpl implements AuctionService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    AuctionRepository auctionRepository;

    @Autowired
    AuctionImgRepository auctionImgRepository;

    @Autowired
    ProductRepository productRepository;
    @Autowired
    ProductHistoryRepository productHistoryRepository;

    @Autowired
    LikesRepository likesRepository;

    @Autowired
    CategoryLargeRepository categoryLargeRepository;
    @Autowired
    CategoryMiddleRepository categoryMiddleRepository;
    @Autowired
    CategorySmallRepository categorySmallRepository;

    @Autowired
    S3Service s3Service;

    @Override
    public String insertAuction(AuctionInsertRequest auctionInsertRequest, List<MultipartFile> auctionImages, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"user not found");

        Optional<Product> product = productRepository.findById(auctionInsertRequest.getProductId());
        if(!product.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"product not found");

        List<String> fileNameList;
        try {
            fileNameList = s3Service.uploadFileList(auctionImages);
        } catch (ResponseStatusException e) {
            throw e;
        }

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss");
        Date endTime;

        try {
            endTime = simpleDateFormat.parse(auctionInsertRequest.getEndTime());
        } catch (ParseException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"parsing error");
        }

        Auction auction = Auction.builder()
                .user(user.get())
                .auctionTitle(auctionInsertRequest.getAuctionTitle())
                .titleImageUrl(fileNameList.get(0))
                .endTime(endTime)
                .product(product.get())
                .startPrice(auctionInsertRequest.getStartPrice())
                .description(auctionInsertRequest.getDescription())
                .cycle(auctionInsertRequest.getCycle())
                .depreciation(auctionInsertRequest.getDepreciation())
                .build();
        auctionRepository.save(auction);

        List<AuctionImg> auctionImgs = new ArrayList<>();
        for(String f : fileNameList) {
            auctionImgs.add(AuctionImg.builder()
                    .imgUrl(f)
                    .auction(auction)
                    .build());
        }

        for(AuctionImg a : auctionImgs) {
            auctionImgRepository.save(a);
        }

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
    public boolean isThisAuctionMine(Auction auction, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent())
            throw new IllegalArgumentException("not found");

        if(auction.getUser().getUserId() != userId)
            return false;
        else
            return true;
    }

    @Override
    public boolean isThisAuctionLiked(Auction auction, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent())
            throw new IllegalArgumentException("not found");

        LikesId likesId = new LikesId();
        likesId.setUser(userId);
        likesId.setAuction(auction.getAuctionId());

        Optional<Likes> likes = likesRepository.findById(likesId);
        if(!likes.isPresent())
            return false;
        else
            return true;
    }

    @Override
    public String deleteAuction(Long auctionId, Long userId) {
        Optional<Auction> auction = auctionRepository.findById(auctionId);
        if(!auction.isPresent())
            throw new IllegalArgumentException("not found");

        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent())
            throw new IllegalArgumentException("not found");
        if(user.get().getUserId() != auction.get().getUser().getUserId())
            return "not owner";

        List<AuctionImg> auctionImgs = auctionImgRepository.findByAuction(auction.get());

        for(AuctionImg a : auctionImgs) {
            String url = a.getImgUrl();
            String name = url.substring(url.lastIndexOf("/")+1, url.length());
            s3Service.deleteFile(name);
        }

        auctionRepository.deleteById(auctionId);

        return "success";
    }

    @Override
    public String insertAuctionLike(Long auctionId, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent())
            throw new IllegalArgumentException("not found");

        Optional<Auction> auction = auctionRepository.findById(auctionId);
        if(!auction.isPresent())
            throw new IllegalArgumentException("not found");

        LikesId likesId = new LikesId();
        likesId.setUser(userId);
        likesId.setAuction(auctionId);

        Optional<Likes> likes = likesRepository.findById(likesId);
        if(likes.isPresent())
            throw new DuplicateKeyException("already liked");

        Likes insertLikes = Likes.builder()
                .auction(auction.get())
                .user(user.get())
                .build();

        likesRepository.save(insertLikes);

        Auction target = auction.get();
        target.setLikeCnt(target.getLikeCnt()+1);
        auctionRepository.save(target);

        return "success";
    }

    @Override
    public String deleteAuctionLike(Long auctionId, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent())
            throw new IllegalArgumentException("not found");

        Optional<Auction> auction = auctionRepository.findById(auctionId);
        if(!auction.isPresent())
            throw new IllegalArgumentException("not found");

        LikesId likesId = new LikesId();
        likesId.setUser(userId);
        likesId.setAuction(auctionId);

        Optional<Likes> likes = likesRepository.findById(likesId);
        if(!likes.isPresent()) {
            throw new IllegalArgumentException("not liked");
        }

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
        if(products.size() < 1)
            throw new NoSuchElementException("products not found");

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
        if(products.size() < 1)
            throw new NoSuchElementException("products not found");

        List<Auction> auctions = auctionRepository.findByProductIn(products, pageable);

        return auctions;
    }
}
