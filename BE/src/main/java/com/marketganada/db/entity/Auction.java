package com.marketganada.db.entity;

import lombok.Getter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@DynamicInsert
@DynamicUpdate
@Table(name="Auction")
public class Auction {
    @Id
    @Column(name = "auction_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long auctionId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "title", columnDefinition = "varchar(50)")
    private String auctionTitle;

    @Column(name = "description", columnDefinition = "varchar(500)")
    private String description;

    @Column(name = "start_time", columnDefinition = "datetime default CURRENT_TIMESTAMP")
    private Date startTime;

    @Column(name = "end_time", columnDefinition = "datetime default CURRENT_TIMESTAMP")
    private Date endTime;

    @Column(name = "start_price", columnDefinition = "int")
    private int startPrice;

    @Column(name = "cycle", columnDefinition = "datetime default CURRENT_TIMESTAMP")
    private Date cycle;

    @Column(name = "depreciation", columnDefinition = "int")
    private int depreciation;

    @Column(name = "status", columnDefinition = "boolean")
    private int auctionStatus;

    @Column(name = "like_cnt", columnDefinition = "int")
    private int likeCnt;

    @OneToOne(mappedBy = "auction", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Payment payment = new Payment();

    @OneToMany(mappedBy = "auction", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<Likes> likes = new HashSet<>();

    @OneToMany(mappedBy = "auction", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<AuctionImg> auctionImgs = new HashSet<>();
}
