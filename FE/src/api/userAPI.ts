/* eslint-disable no-irregular-whitespace */
import { defaultInstance } from 'api';
import { ACCESS_TOKEN } from 'constants/headers';
import { User } from 'types/Entity';
import AddressForm from 'types/Form/AddressForm';
import BankForm from 'types/Form/BankForm';
import {
  UserUpdateNicknameForm,
  UserUpdatePasswordForm,
} from 'types/Form/UserForm';

const api = defaultInstance();
api.defaults.headers.common.Authorization = ACCESS_TOKEN;

// 회원정보
// 내 정보
function getUser() {
  // responseBody 타입 사용예정
  return api.get<User>('/user');
}

// 회원 탈퇴
function deleteUser() {
  return api.delete('/user');
}

// 닉네임 변경
function updateNickname(payload: UserUpdateNicknameForm) {
  return api.put('/user/nickname', payload);
}
// 비밀번호 변경
function updatePassword(payload: UserUpdatePasswordForm) {
  return api.put('/user/pw', payload);
}

// 주소록 정보
// 주소록 조회
function getAddressbook() {
  return api.get('/user/addressbook');
}

// 주소록 등록
function createAddressbook(address: AddressForm) {
  return api.post('/user/addressbook', address);
}

// 주소록 삭제
function deleteAddressbook() {
  return api.delete('/user/addressbook');
}

// 주소록 수정
function updateAddressbook(payload: AddressForm, param: string) {
  return api.put(`/user/addressbook${param}`, payload);
}

// 계좌 정보
// 정산 계좌 조회
function getBank() {
  return api.get('/user/bank');
}
// 정산 계좌 등록 및 수정
function updateBank(payload: BankForm) {
  return api.put('/user/bank', payload);
}

const userAPI = {
  getUser,
  deleteUser,
  updateNickname,
  updatePassword,
  getAddressbook,
  createAddressbook,
  deleteAddressbook,
  updateAddressbook,
  getBank,
  updateBank,
};

export default userAPI;
