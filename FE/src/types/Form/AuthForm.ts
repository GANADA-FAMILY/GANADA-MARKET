export interface LoginForm {
  userEmail: string;
  userPw: string;
}

export interface FindPasswordForm {
  userEmail: string;
  userPhone: string;
}

export interface SignupForm {
  userEmail: string;
  userPw: string;
  userNickname: string;
  userPhone: string;
}

export interface DuplicateNicknameForm {
  userNickname: string;
}

export interface FindEmailForm {
  userPhone: string;
}
