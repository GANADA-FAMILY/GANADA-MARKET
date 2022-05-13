/* eslint-disable no-irregular-whitespace */
import { defaultInstance } from 'api';
import { FindPasswordForm, LoginForm, SignupForm } from 'types/Form/AuthForm';

const api = defaultInstance();

// 로그인
function login(payload: LoginForm) {
  return api.post('/auth/login', JSON.stringify(payload));
}

// 회원가입
function signup(payload: SignupForm) {
  return api.post('/auth/signup', JSON.stringify(payload));
}

// 닉네임 중복 검사
function duplicateNickname(param: string) {
  return api.get(`/auth​/duplicate-nickname​/${param}`);
}

// 이메일 찾기(휴대폰 번호로)
function findPassword(param: string) {
  return api.get(`/api/auth/find-email/${param}`);
}

// 비밀번호 찾기(이메일, 휴대폰번호)
function findEmailByPhone(payload: FindPasswordForm) {
  return api.put('/api/auth/find-pw', payload);
}

const authAction = {
  login,
  signup,
  duplicateNickname,
  findPassword,
  findEmailByPhone,
};

export default authAction;
