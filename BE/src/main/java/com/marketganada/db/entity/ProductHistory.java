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
@Table(name="ProductHistory")
public class ProductHistory {
    @Id
    @Column(name = "history_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;

    @Column(name = "history_date", columnDefinition = "datetime default CURRENT_TIMESTAMP")
    private Date historyDate;

    @Column(name = "price", columnDefinition = "int")
    private int historyPrice;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Builder
    public ProductHistory(Date historyDate, int historyPrice, Product product) {
        this.historyDate = historyDate;
        this.historyPrice = historyPrice;
        this.product = product;
    }
}
