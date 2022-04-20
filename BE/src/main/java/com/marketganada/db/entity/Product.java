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
@Table(name="Product")
public class Product {
    @Id
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

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

    @ManyToOne
    @JoinColumn(name = "category_l")
    private CategoryLarge categoryL;

    @ManyToOne
    @JoinColumn(name = "category_s")
    private CategorySmall categoryS;
}
