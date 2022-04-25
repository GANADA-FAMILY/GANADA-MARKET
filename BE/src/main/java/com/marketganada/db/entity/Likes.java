package com.marketganada.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor
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

    @Builder
    public Likes(Auction auction, User user) {
        this.auction = auction;
        this.user = user;
    }
}
