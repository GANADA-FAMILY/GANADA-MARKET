package com.marketganada.api.service;

import com.marketganada.api.request.*;
import com.marketganada.db.entity.AddressBook;
import com.marketganada.db.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService  {
    String login(UserLoginRequest userLoginRequest);
    String insertUser(UserSignUpRequest userSignUpRequest);
    void deleteUser(User user);
    Optional<User> getUserByUserEmail(String userEmail);
    String checkDuplicateUserEmail(String userEmail);
    String checkDuplicateUserNickname(String userNickname);
    String updateUserNickname(UserNicknameUpdateRequest userNicknameUpdateRequest, User user);
    String updateUserPw(UserPwUpdateRequest userPwUpdateRequest, User user);
    void updateUserBank(UserBankUpdateRequest userBankUpdateRequest, User user) throws Exception;
    void insertUserAddressBook(AddressBookInsertRequest addressBookInsertRequest, User user);
    List<AddressBook> getAddressBookList(User user);
    String updateAddressBook(AddressBookInsertRequest addressBookInsertRequest, User user, Long addressId);
    String deleteAddressBook(User user, Long addressId);
    List<User> getUserListByUserPhone(String userPhone);
    String updateActivateAddressBook(User user, Long addressId);
}
