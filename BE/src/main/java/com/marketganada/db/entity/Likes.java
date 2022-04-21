package com.marketganada.db.entity;

import lombok.Getter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@DynamicInsert
@DynamicUpdate
@IdClass(LikesId.class)
@Table(name="Likes")
public class Likes implements Serializable {
    @Id
    @ManyToOne
    @JoinColumn(name = "auction_id")
    private Auction auction;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
