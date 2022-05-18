/* eslint-disable no-irregular-whitespace */
import { defaultInstance } from 'api';
import {
  DuplicateNicknameForm,
  FindEmailForm,
  FindPasswordForm,
  LoginForm,
  SignupForm,
} from 'types/Form/AuthForm';
import Payload from 'types/Form/Payload';

const api = defaultInstance();

// 로그인
function login(payload: Payload<LoginForm>) {
  return api.post('/auth/login', payload.formData);
}

// 회원가입
function signup(payload: Payload<SignupForm>) {
  return api.post('/auth/signup', payload.formData);
}

// 닉네임 중복 검사
// function duplicateNickname(payload: Payload<DuplicateNicknameForm>) {
function duplicateNickname(pathValue: string) {
  return api.get(`/auth​/duplicate-nickname​/${pathValue}`);
}

// 이메일 찾기(휴대폰 번호로)
// function findPassword(payload: Payload<FindEmailForm>) {
function findPassword(pathValue: string) {
  return api.get(`/api/auth/find-email/${pathValue}`);
}

// 비밀번호 찾기(이메일, 휴대폰번호)
function findEmailByPhone(payload: Payload<FindPasswordForm>) {
  return api.put('/api/auth/find-pw', payload.formData);
}

const authAPI = {
  login,
  signup,
  duplicateNickname,
  findPassword,
  findEmailByPhone,
};

export default authAPI;
