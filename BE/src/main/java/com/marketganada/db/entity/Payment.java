package com.marketganada.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Table(name="Payment")
public class Payment {
    @Id
    @Column(name = "payment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @Column(name = "price", columnDefinition = "int")
    private int price;

    @Column(name = "status", columnDefinition = "int")
    private int status;

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

    @Builder
    public Payment(int price, int status, String paymentMethod, Date tradeDate, String buyerName, String phone, String postalCode, String address, String addressDetail, User user, Auction auction) {
        this.price = price;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.tradeDate = tradeDate;
        this.buyerName = buyerName;
        this.phone = phone;
        this.postalCode = postalCode;
        this.address = address;
        this.addressDetail = addressDetail;
        this.user = user;
        this.auction = auction;
    }
}
