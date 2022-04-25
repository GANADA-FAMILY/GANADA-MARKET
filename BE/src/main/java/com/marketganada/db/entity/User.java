package com.marketganada.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
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

    @Builder
    public User(String _userEmail, String _userPw, String _userNickname, String _userPhone) {
        userEmail = _userEmail;
        userPw = _userPw;
        userNickname = _userNickname;
        userPhone = _userPw;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", profileImageUrl='" + profileImageUrl + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userPw='" + userPw + '\'' +
                ", userNickname='" + userNickname + '\'' +
                ", userPhone='" + userPhone + '\'' +
                ", userType=" + userType +
                ", bank='" + bank + '\'' +
                ", bankNum='" + bankNum + '\'' +
                ", role='" + role + '\'' +
                ", grade='" + grade + '\'' +
                '}';
    }
}
