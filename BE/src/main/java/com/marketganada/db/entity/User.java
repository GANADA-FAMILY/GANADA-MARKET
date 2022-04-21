package com.marketganada.db.entity;

import lombok.Getter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@DynamicInsert
@DynamicUpdate
@Table(name="User")
public class User {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "profile_image_url", columnDefinition = "varchar(500)")
    private String profileImageUrl;

    @Column(name = "user_email", columnDefinition = "varchar(30)")
    private String userEmail;

    @Column(name = "user_pw", columnDefinition = "varchar(20)")
    private String userPw;

    @Column(name = "user_nickname", columnDefinition = "varchar(20)")
    private String userNickname;

    @Column(name = "user_phone", columnDefinition = "varchar(20)")
    private String userPhone;

    @Column(name = "user_type")
    private int userType;

    @Column(name = "bank", columnDefinition = "varchar(20)")
    private String bank;

    @Column(name = "bank_num", columnDefinition = "varchar(30)")
    private String bankNum;

    @Column(name = "role", columnDefinition = "varchar(30)")
    private String role;

    @Column(name = "grade", columnDefinition = "varchar(30)")
    private String grade;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<AddressBook> addressBooks = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<Auction> auctions = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<Likes> likes = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<Payment> payments = new HashSet<>();
}
