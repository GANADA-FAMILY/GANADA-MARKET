package com.marketganada.api.service;

import com.marketganada.api.request.AuctionInsertRequest;
import com.marketganada.common.ProductSpecification;
import com.marketganada.common.AuctionSpecification;
import com.marketganada.db.entity.*;
import com.marketganada.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public String insertAuction(AuctionInsertRequest auctionInsertRequest, List<MultipartFile> auctionImages, User user) {

        Optional<Product> product = productRepository.findById(auctionInsertRequest.getProductId());
        if(!product.isPresent())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"product not exist");

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
                .user(user)
                .auctionTitle(auctionInsertRequest.getAuctionTitle())
                .auctionStatus(true)
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
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return auction.get();
    }

    @Override
    public boolean isThisAuctionMine(Auction auction, User user) {
        if(auction.getUser().getUserId() != user.getUserId())
            return false;
        else
            return true;
    }

    @Override
    public boolean isThisAuctionLiked(Auction auction, User user) {
        LikesId likesId = new LikesId();
        likesId.setUser(user.getUserId());
        likesId.setAuction(auction.getAuctionId());

        Optional<Likes> likes = likesRepository.findById(likesId);
        if(!likes.isPresent())
            return false;
        else
            return true;
    }

    @Override
    public String deleteAuction(Long auctionId, User user) {
        Optional<Auction> auction = auctionRepository.findById(auctionId);
        if(!auction.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        if(user.getUserId() != auction.get().getUser().getUserId())
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
    public String insertAuctionLike(Long auctionId, User user) {
        Optional<Auction> auction = auctionRepository.findById(auctionId);
        if(!auction.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        LikesId likesId = new LikesId();
        likesId.setUser(user.getUserId());
        likesId.setAuction(auctionId);

        Optional<Likes> likes = likesRepository.findById(likesId);
        if(likes.isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT);

        Likes insertLikes = Likes.builder()
                .auction(auction.get())
                .user(user)
                .build();

        likesRepository.save(insertLikes);

        Auction target = auction.get();
        target.setLikeCnt(target.getLikeCnt()+1);
        auctionRepository.save(target);

        return "success";
    }

    @Override
    public String deleteAuctionLike(Long auctionId, User user) {
        Optional<Auction> auction = auctionRepository.findById(auctionId);
        if(!auction.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        LikesId likesId = new LikesId();
        likesId.setUser(user.getUserId());
        likesId.setAuction(auctionId);

        Optional<Likes> likes = likesRepository.findById(likesId);
        if(!likes.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        likesRepository.deleteById(likesId);

        Auction target = auction.get();
        target.setLikeCnt(target.getLikeCnt()-1);
        auctionRepository.save(target);

        return "success";
    }

    @Override
    public Page<Auction> getRecentAuctionList(Pageable pageable) {
        Page<Auction> auctions = auctionRepository.findAll(pageable);

        return auctions;
    }

    @Override
    public Page<Auction> getAuctionPhoneList(List<String> brand, List<String> model, List<String> save, Pageable pageable) {
        Specification<Product> spec = (root, query, criteriaBuilder) -> null;
        spec = spec.and(ProductSpecification.equalCategoryLargeName("스마트폰"));

        if(!brand.get(0).equals("ALL"))
            spec = spec.and(ProductSpecification.equalProductBrands(brand));
        if(!model.get(0).equals("ALL"))
            spec = spec.and(ProductSpecification.equalProductNames(model));
        if(!save.get(0).equals("ALL"))
            spec = spec.and(ProductSpecification.equalCategorySmallNames(save));

        List<Product> products = productRepository.findAll(spec);
        if(products.size() < 1)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        Specification<Auction> auctionSpec = (root, query, criteriaBuilder) -> null;
        auctionSpec = auctionSpec.and(AuctionSpecification.isAuctionStatus())
                .and(AuctionSpecification.greaterThanEndTime(new Date()))
                .and(AuctionSpecification.inProduct(products));

        Page<Auction> auctions = auctionRepository.findAll(auctionSpec, pageable);

        if(auctions.toList().size() < 1)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return auctions;
    }

    @Override
    public Page<Auction> getAuctionEarphoneList(List<String> brand, List<String> model, Pageable pageable) {
        Specification<Product> spec = (root, query, criteriaBuilder) -> null;

        spec = spec.and(ProductSpecification.equalCategoryLargeName("이어폰"));

        if(!brand.get(0).equals("ALL"))
            spec = spec.and(ProductSpecification.equalProductBrands(brand));
        if(!model.get(0).equals("ALL"))
            spec = spec.and(ProductSpecification.equalProductNames(model));

        List<Product> products = productRepository.findAll(spec);
        if(products.size() < 1)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        Specification<Auction> auctionSpec = (root, query, criteriaBuilder) -> null;
        auctionSpec = auctionSpec.and(AuctionSpecification.isAuctionStatus())
                .and(AuctionSpecification.greaterThanEndTime(new Date()))
                .and(AuctionSpecification.inProduct(products));

        Page<Auction> auctions = auctionRepository.findAll(auctionSpec, pageable);

        return auctions;
    }

    @Override
    public List<Likes> getLikeAuctionList(User user) {

        List<Likes> likeAuctionList = likesRepository.findByUser(user);
        return likeAuctionList;
    }

    @Override
    public Long getAuctionCnt(String category, List<String> brand, List<String> model, List<String> save) {
        Specification<Product> spec = (root, query, criteriaBuilder) -> null;

        if(!category.equals("ALL"))
            spec = spec.and(ProductSpecification.equalCategoryLargeName(category));
        if(!brand.get(0).equals("ALL"))
            spec = spec.and(ProductSpecification.equalProductBrands(brand));
        if(!model.get(0).equals("ALL"))
            spec = spec.and(ProductSpecification.equalProductNames(model));
        if(!save.get(0).equals("ALL"))
            spec = spec.and(ProductSpecification.equalCategorySmallNames(save));

        List<Product> products = productRepository.findAll(spec);
        if(products.size() < 1)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        Specification<Auction> auctionSpec = (root, query, criteriaBuilder) -> null;
        auctionSpec = auctionSpec.and(AuctionSpecification.isAuctionStatus())
                .and(AuctionSpecification.greaterThanEndTime(new Date()))
                .and(AuctionSpecification.inProduct(products));

        Long auctionCnt = auctionRepository.count(auctionSpec);

        return auctionCnt;
    }

    @Override
    public List<Auction> getTrueAuctionListByUser(User user) {
        List<Auction> selling = auctionRepository.findByUserAndAuctionStatus(user,true);
        return selling;
    }
}
