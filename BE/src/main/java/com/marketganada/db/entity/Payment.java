package com.marketganada.db.entity;

import lombok.Getter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@DynamicInsert
@DynamicUpdate
@Table(name="Payment")
public class Payment {
    @Id
    @Column(name = "payment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @Column(name = "price", columnDefinition = "int")
    private String price;

    @Column(name = "status", columnDefinition = "int")
    private String releasePrice;

    @Column(name = "tracking_num", columnDefinition = "varchar(20)")
    private String trackingNum;

    @Column(name = "payment_method", columnDefinition = "varchar(20)")
    private String paymentMethod;

    @Column(name = "created_at", columnDefinition = "datetime default CURRENT_TIMESTAMP")
    private Date tradeDate;

    @Column(name = "buyer_name", columnDefinition = "varchar(20)")
    private String buyerName;

    @Column(name = "phone", columnDefinition = "varchar(20)")
    private String phone;

    @Column(name = "postal_code", columnDefinition = "varchar(20)")
    private String postalCode;

    @Column(name = "address", columnDefinition = "varchar(100)")
    private String address;

    @Column(name = "address_detail", columnDefinition = "varchar(100)")
    private String addressDetail;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "auction_id")
    private Auction auction;
}
