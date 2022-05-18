package com.marketganada.db.repository;

import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Payment;
import com.marketganada.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment,Long> {
    Optional<Payment> findByUserAndAuction(User user, Auction auction);
    Optional<Payment> findByAuction(Auction auction);
    List<Payment> findByUser(User user);

    @Query(value = "select * from payment where auction_id = (select auction_id from auction where user_id= ?1)", nativeQuery = true)
    List<Payment> selectSalesHistory(Long userId);

}
