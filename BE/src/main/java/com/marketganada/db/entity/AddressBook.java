package com.marketganada.db.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Table(name="AddressBook")
public class AddressBook {
    @Id
    @Column(name = "address_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    @Column(name = "address_name", columnDefinition = "varchar(20)")
    private String addressName;

    @Column(name = "address_phone", columnDefinition = "varchar(20)")
    private String addressPhone;

    @Column(name = "postal_code", columnDefinition = "varchar(20)")
    private String postalCode;

    @Column(name = "address", columnDefinition = "varchar(100)")
    private String address;

    @Column(name = "address_detail", columnDefinition = "varchar(100)")
    private String addressDetail;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public AddressBook(String addressName, String addressPhone, String postalCode, String address, String addressDetail, User user) {
        this.addressName = addressName;
        this.addressPhone = addressPhone;
        this.postalCode = postalCode;
        this.address = address;
        this.addressDetail = addressDetail;
        this.user = user;
    }
}
