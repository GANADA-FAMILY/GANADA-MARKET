package com.marketganada.api.service;

import com.marketganada.api.request.*;
import com.marketganada.common.AES256;
import com.marketganada.db.entity.AddressBook;
import com.marketganada.db.entity.User;
import com.marketganada.db.repository.AddressBookRepository;
import com.marketganada.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service("userService")
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    AddressBookRepository addressBookRepository;

    @Autowired
    S3Service s3Service;

    @Autowired
    private BCryptPasswordEncoder encodePwd;

    @Override
    public String login(UserLoginRequest userLoginRequest) {
        Optional<User> user = userRepository.findByUserEmail(userLoginRequest.getUserEmail());
        if(!user.isPresent()){
            return "fail1";
        }
        if (!encodePwd.matches(userLoginRequest.getUserPw(), user.get().getUserPw())) {
            return "fail2";
        }

        return "success";
    }

    @Override
    public String insertUser(UserSignUpRequest userSignUpRequest) {
       String duplicateCheckEmail =  checkDuplicateUserEmail(userSignUpRequest.getUserEmail());
        if(duplicateCheckEmail.equals("fail")){
            return "fail";
        }
        String duplicateCheckNickname =  checkDuplicateUserNickname(userSignUpRequest.getUserNickname());
        if(duplicateCheckNickname.equals("fail")){
            return "fail";
        }

        User user = new User();
        user.setUserEmail(userSignUpRequest.getUserEmail());
        user.setUserPw(encodePwd.encode(userSignUpRequest.getUserPw()));
        user.setUserNickname(userSignUpRequest.getUserNickname());
        user.setUserPhone(userSignUpRequest.getUserPhone());
        user.setRole("ROLE_USER");
        user.setGrade("일반 회원");
        user.setProfileImageUrl("https://ganada.s3.ap-northeast-2.amazonaws.com/default.png");
        user.setUserType(0);
        userRepository.save(user);
        return "success";
    }

    @Override
    public void deleteUser(User user) {
        String profileImageUrl = user.getProfileImageUrl();
        String profileImageName = profileImageUrl.substring(profileImageUrl.lastIndexOf("/")+1, profileImageUrl.length());

        s3Service.deleteFile(profileImageName);
        userRepository.delete(user);
    }

    @Override
    public Optional<User> getUserByUserEmail(String userEmail) {
        Optional<User> user = userRepository.findByUserEmail(userEmail);
        return user;
    }

    @Override
    public String checkDuplicateUserEmail(String userEmail) {
        Optional<User> user = userRepository.findByUserEmail(userEmail);
        if(user.isPresent()){
            return "fail";
        }
        return "success";
    }

    @Override
    public String checkDuplicateUserNickname(String userNickname) {
        Optional<User> user = userRepository.findByUserNickname(userNickname);
        if(user.isPresent()){
            return "fail";
        }
        return "success";
    }

    @Override
    public String updateUserNickname(UserNicknameUpdateRequest userNicknameUpdateRequest, User user) {
        String res = checkDuplicateUserNickname(userNicknameUpdateRequest.getUserNickname());
        if(res.equals("success")){
            user.setUserNickname(userNicknameUpdateRequest.getUserNickname());

            userRepository.save(user);
            return "success";
        }else{
            return "fail";
        }
    }

    @Override
    public String updateUserPw(UserPwUpdateRequest userPwUpdateRequest, User user) {

        if (!encodePwd.matches(userPwUpdateRequest.getCurrentPw(), user.getUserPw())) {
            return "fail";
        }else{
            user.setUserPw(encodePwd.encode(userPwUpdateRequest.getNewPw()));
            userRepository.save(user);
            return "success";
        }

    }

    @Override
    public void updateUserBank(UserBankUpdateRequest userBankUpdateRequest, User user) throws Exception {

        AES256 aes256 = new AES256();
        String cipherText =  aes256.encrypt(userBankUpdateRequest.getBankNum());

        user.setBank(userBankUpdateRequest.getBank());
        user.setBankNum(cipherText);
        user.setBankHolder(userBankUpdateRequest.getBankHolder());

        userRepository.save(user);
    }

    @Override
    public void insertUserAddressBook(AddressBookInsertRequest addressBookInsertRequest, User user) {
        AddressBook addressBook = AddressBook.builder()
                .addressName(addressBookInsertRequest.getAddressName())
                .addressPhone(addressBookInsertRequest.getAddressPhone())
                .postalCode(addressBookInsertRequest.getPostalCode())
                .address(addressBookInsertRequest.getAddress())
                .addressDetail(addressBookInsertRequest.getAddressDetail())
                .activate(false)
                .user(user).build();
        addressBookRepository.save(addressBook);
    }

    @Override
    public List<AddressBook> getAddressBookList(User user) {
        List<AddressBook> addressBookList = addressBookRepository.findByUser(user);
        for(AddressBook addressBook : addressBookList){
            System.out.println(addressBook.getAddressName());
        }
        return addressBookList;
    }

    @Override
    public String updateAddressBook(AddressBookInsertRequest addressBookInsertRequest, User user, Long addressId) {
        Optional<AddressBook> addressBook = addressBookRepository.findByAddressIdAndUser(addressId,user);
        if(!addressBook.isPresent()){
            return "fail";
        }
        addressBook.get().setAddressName(addressBookInsertRequest.getAddressName());
        addressBook.get().setAddressPhone(addressBookInsertRequest.getAddressPhone());
        addressBook.get().setPostalCode(addressBookInsertRequest.getPostalCode());
        addressBook.get().setAddress(addressBookInsertRequest.getAddress());
        addressBook.get().setAddressDetail(addressBookInsertRequest.getAddressDetail());
        addressBookRepository.save(addressBook.get());
        return "success";
    }

    @Override
    public String deleteAddressBook(User user, Long addressId) {
        Optional<AddressBook> addressBook = addressBookRepository.findByAddressIdAndUser(addressId,user);
        if(!addressBook.isPresent()){
            return "fail";
        }
        addressBookRepository.delete(addressBook.get());
        return "success";
    }

    @Override
    public List<User> getUserListByUserPhone(String userPhone) {
        return userRepository.findByUserPhoneAndUserType(userPhone,0);
    }

    @Override
    @Transactional
    public String updateActivateAddressBook(User user, Long addressId) {
        Optional<AddressBook> addressBook = addressBookRepository.findByAddressIdAndUser(addressId,user);
        if(!addressBook.isPresent()){
            return "fail";
        }

        //대표 주소가 있다면 해제
        Optional<AddressBook> representAddressBook = addressBookRepository.findByUserAndActivate(user,true);
        if(representAddressBook.isPresent()){
            representAddressBook.get().setActivate(false);
            addressBookRepository.save(representAddressBook.get());
        }

        //대표 주소로 등록
        addressBook.get().setActivate(true);
        addressBookRepository.save(addressBook.get());


        return "변경성공";
    }

    @Override
    public String updateUserProfileImage(User user, MultipartFile profileImage) {
        List<MultipartFile> profileImageForInput = new ArrayList<>();
        profileImageForInput.add(profileImage);

        List<String> profileImageUrl;

        try {
            profileImageUrl = s3Service.uploadFileList(profileImageForInput);
        } catch (ResponseStatusException e) {
            throw e;
        }

        String beforeUrl = user.getProfileImageUrl();
        String beforeName = beforeUrl.substring(beforeUrl.lastIndexOf("/")+1, beforeUrl.length());

        user.setProfileImageUrl(profileImageUrl.get(0));
        userRepository.save(user);

        s3Service.deleteFile(beforeName);

        return "success";
    }
}
