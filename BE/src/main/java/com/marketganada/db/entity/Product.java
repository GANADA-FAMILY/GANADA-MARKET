package com.marketganada.db.entity;

import com.marketganada.api.request.ProductInsertRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
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
    private CategoryMiddle categoryMiddle;

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
    private int releasePrice;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<Auction> auctions = new HashSet<>();

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<ProductHistory> productHistories = new HashSet<>();

    @Builder
    public Product(CategoryLarge categoryLarge, CategoryMiddle categoryMiddle, CategorySmall categorySmall, String productName, String productBrand, String deviceId, String description, Date releaseDate, int releasePrice) {
        this.categoryLarge = categoryLarge;
        this.categoryMiddle = categoryMiddle;
        this.categorySmall = categorySmall;
        this.productName = productName;
        this.productBrand = productBrand;
        this.deviceId = deviceId;
        this.description = description;
        this.releaseDate = releaseDate;
        this.releasePrice = releasePrice;
    }

    public void update(ProductInsertRequest productInsertRequest, CategoryLarge categoryLarge, CategoryMiddle categoryMiddle, CategorySmall categorySmall) {
        this.categoryLarge = categoryLarge;
        this.categoryMiddle = categoryMiddle;
        this.categorySmall = categorySmall;
        this.productName = productInsertRequest.getProductName();
        this.productBrand = productInsertRequest.getProductBrand();
        this.deviceId = productInsertRequest.getDeviceId();
        this.description = productInsertRequest.getDescription();
        this.releaseDate = productInsertRequest.getReleaseDate();
        this.releasePrice = productInsertRequest.getReleasePrice();
    }

    @Override
    public String toString() {
        return "Product{" +
                "productId=" + productId +
                ", categoryLarge=" + categoryLarge +
                ", categoryMiddle=" + categoryMiddle +
                ", categorySmall=" + categorySmall +
                ", productName='" + productName + '\'' +
                ", productBrand='" + productBrand + '\'' +
                ", deviceId='" + deviceId + '\'' +
                ", description='" + description + '\'' +
                ", releaseDate=" + releaseDate +
                ", releasePrice='" + releasePrice + '\'' +
                ", auctions=" + auctions +
                ", productHistories=" + productHistories +
                '}';
    }
}
