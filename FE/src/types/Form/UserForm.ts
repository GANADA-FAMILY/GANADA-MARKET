export default interface UserForm {
  userEmail: string;
  userNickname: string;
  userPhone: string;
  profileImageUrl: string;
  grade: string;
}

export interface UserUpdateNicknameForm {
  userNickname: string;
}

export interface UserUpdatePasswordForm {
  currentPw: string;
  newPw: string;
}

export interface UserImageForm {
  profileImage: FormData;
}
