package com.marketganada.jpatest;

import com.marketganada.db.entity.*;
import com.marketganada.db.repository.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@SpringBootTest
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class EntityTest {
    @Autowired
    UserRepository userRepository;
    @Autowired
    AddressBookRepository addressBookRepository;
    @Autowired
    AuctionRepository auctionRepository;
    @Autowired
    AuctionImgRepository auctionImgRepository;
    @Autowired
    CategoryLargeRepository categoryLargeRepository;
    @Autowired
    CategoryMiddleRepository categoryMiddleRepository;
    @Autowired
    CategorySmallRepository categorySmallRepository;
    @Autowired
    LikesRepository likesRepository;
    @Autowired
    PaymentRepository paymentRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ProductHistoryRepository productHistoryRepository;
    
    private User user;
    private Product product;
    private ProductHistory productHistory;
    private Payment payment;
    private Likes likes;
    private CategoryLarge categoryLarge;
    private CategoryMiddle categoryMiddle;
    private CategorySmall categorySmall;
    private Auction auction;
    private AuctionImg auctionImg;
    private AddressBook addressBook;

    @BeforeAll
    public void setup() {
        user = User.builder()
                ._userEmail("email@email.com")
                ._userPw("pw12!")
                ._userNickname("nickname")
                ._userPhone("01012345678")
                .build();

        categoryLarge = CategoryLarge.builder()
                .name("large")
                .build();

        categoryMiddle = CategoryMiddle.builder()
                .categoryLarge(categoryLarge)
                .name("middle")
                .build();

        categorySmall = CategorySmall.builder()
                .categoryMiddle(categoryMiddle)
                .name("small")
                .build();

        product = Product.builder()
                .productName("product")
                .productBrand("brand")
                .categoryLarge(categoryLarge)
                .categoryMiddle(categoryMiddle)
                .categorySmall(categorySmall)
                .description("desc")
                .deviceId("device")
                .releaseDate(new Date())
                .releasePrice(1)
                .build();

        productHistory = ProductHistory.builder()
                .historyDate(new Date())
                .historyPrice(1)
                .product(product)
                .build();

        addressBook = AddressBook.builder()
                .address("address")
                .addressDetail("detail")
                .addressName("my address")
                .user(user)
                .activate(true)
                .addressPhone("phone")
                .postalCode("postal")
                .build();

        auction = Auction.builder()
                .auctionStatus(true)
                .auctionTitle("title")
                .cycle(10)
                .depreciation(0)
                .description("desc")
                .endTime(new Date())
                .likeCnt(0)
                .product(product)
                .startPrice(0)
                .startTime(new Date())
                .user(user)
                .build();

        payment = Payment.builder()
                .address("address")
                .auction(auction)
                .addressDetail("detail")
                .postalCode("postal")
                .status(0)
                .buyerName("buyer")
                .phone("phone")
                .price(10000)
                .build();

        auctionImg = AuctionImg.builder()
                .auction(auction)
                .imgUrl("url")
                .build();
    }

    @Test
    @Order(1)
    public void insertTest() {
        userRepository.save(user);
        categoryLargeRepository.save(categoryLarge);
        categoryMiddleRepository.save(categoryMiddle);
        categorySmallRepository.saveAndFlush(categorySmall);
        productRepository.save(product);
        productHistoryRepository.save(productHistory);
        auctionRepository.save(auction);
        auctionImgRepository.save(auctionImg);
        paymentRepository.save(payment);
        addressBookRepository.save(addressBook);

        List<User> users = userRepository.findAll();
        for(User u : users)
            System.out.println(u.toString());

        List<CategoryLarge> categoryLarges = categoryLargeRepository.findAll();
        for(CategoryLarge c : categoryLarges)
            System.out.println(c);

        List<CategoryMiddle> categoryMiddles = categoryMiddleRepository.findAll();
        for(CategoryMiddle c : categoryMiddles)
            System.out.println(c);

        List<CategorySmall> categorySmalls = categorySmallRepository.findAll();
        for(CategorySmall c : categorySmalls)
            System.out.println(c);

        List<Product> products = productRepository.findAll();
        List<ProductHistory> productHistories = productHistoryRepository.findAll();
        for(Product p : products)
            System.out.println(p);

        for(ProductHistory ph : productHistories)
            System.out.println(ph);
    }
}
