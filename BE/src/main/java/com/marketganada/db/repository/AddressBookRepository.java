package com.marketganada.db.repository;

import com.marketganada.db.entity.AddressBook;
import com.marketganada.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddressBookRepository extends JpaRepository<AddressBook,Long> {
    List<AddressBook> findByUser(User user);
    Optional<AddressBook> findByAddressIdAndUser(Long addressId, User user);
    Optional<AddressBook> findByUserAndActivate(User user,boolean activate);
}
