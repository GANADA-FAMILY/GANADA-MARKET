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
@Table(name="Product")
public class Product {
    @Id
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @ManyToOne
    @JoinColumn(name = "category_large_id")
    private CategoryLarge categoryLarge;

    @ManyToOne
    @JoinColumn(name = "category_middle_id")
    private CategorySmall categoryMiddle;

    @ManyToOne
    @JoinColumn(name = "category_small_id")
    private CategorySmall categorySmall;

    @Column(name = "name", columnDefinition = "varchar(50)")
    private String productName;

    @Column(name = "brand", columnDefinition = "varchar(50)")
    private String productBrand;

    @Column(name = "device_id", columnDefinition = "varchar(20)")
    private String deviceId;

    @Column(name = "description", columnDefinition = "varchar(100)")
    private String description;

    @Column(name = "release_date", columnDefinition = "datetime default CURRENT_TIMESTAMP")
    private Date releaseDate;

    @Column(name = "release_price", columnDefinition = "int")
    private String releasePrice;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<Auction> auctions = new HashSet<>();

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<ProductHistory> productHistories = new HashSet<>();
}
