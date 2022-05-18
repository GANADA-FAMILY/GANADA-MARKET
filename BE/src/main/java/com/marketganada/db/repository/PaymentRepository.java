package com.marketganada.db.repository;

import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Payment;
import com.marketganada.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment,Long> {
    Optional<Payment> findByUserAndAuction(User user, Auction auction);
    Optional<Payment> findByAuction(Auction auction);
}
