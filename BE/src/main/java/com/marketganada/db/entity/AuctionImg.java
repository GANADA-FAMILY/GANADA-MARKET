package com.marketganada.db.entity;

import lombok.Getter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@DynamicInsert
@DynamicUpdate
@Table(name="AuctionImg")
public class AuctionImg {
    @Id
    @Column(name = "img_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imgId;

    @Column(name = "img_url", columnDefinition = "varchar(500)")
    private String imgUrl;

    @ManyToOne
    @JoinColumn(name = "auction_id")
    private Auction auction;
}
