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
@Table(name="ProductHistory")
public class ProductHistory {
    @Id
    @Column(name = "history_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;

    @Column(name = "history_date", columnDefinition = "datetime default CURRENT_TIMESTAMP")
    private Date historyDate;

    @Column(name = "price", columnDefinition = "int")
    private String historyPrice;
}
