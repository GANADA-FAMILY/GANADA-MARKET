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
  return api.post('/auth/login', payload);
}

// 회원가입
function signup(payload: Payload<SignupForm>) {
  return api.post('/auth/signup', payload);
}

// 닉네임 중복 검사
function duplicateNickname(payload: Payload<DuplicateNicknameForm>) {
  // eslint-disable-next-line no-irregular-whitespace
  return api.get(`/auth​/duplicate-nickname​/${payload.userNickname}`);
}

// 이메일 찾기(휴대폰 번호로)
function findPassword(payload: Payload<FindEmailForm>) {
  return api.get(`/api/auth/find-email/${payload.userPhone}`);
}

// 비밀번호 찾기(이메일, 휴대폰번호)
function findEmailByPhone(payload: Payload<FindPasswordForm>) {
  return api.put('/api/auth/find-pw', payload);
}

const authAPI = {
  login,
  signup,
  duplicateNickname,
  findPassword,
  findEmailByPhone,
};

export default authAPI;
