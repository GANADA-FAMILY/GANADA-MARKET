package com.marketganada.db.repository;

import com.marketganada.db.entity.AddressBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressBookRepository extends JpaRepository<AddressBook,Long> {
}
