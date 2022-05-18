import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authAPI from 'api/authAPI';
import userAction from 'api/userAPI';
import { User } from 'types/Entity/UserAPI';
import { DuplicateNicknameForm } from 'types/Form/AuthForm';
import Payload from 'types/Form/Payload';
import {
  UserUpdateNicknameForm,
  UserUpdatePasswordForm,
} from 'types/Form/UserForm';

export const fetchUserByToken = createAsyncThunk('api/user', async () => {
  const response = await userAction.getUser();
  console.log(response.data);
  return response.data;
});

export const updateNickname = createAsyncThunk(
  'api/user/nickname',
  async (payload: Payload<UserUpdateNicknameForm>) => {
    console.log(payload);
    await userAction.updateNickname(payload);
    return payload.formData?.userNickname;
  },
);

export const updatePassword = createAsyncThunk(
  'api/user/pw',
  async (payload: Payload<UserUpdatePasswordForm>) => {
    console.log(payload);
    await userAction.updatePassword(payload);
    return payload.formData?.newPw;
  },
);

interface UserState {
  user: User;
  nickNameForm: UserUpdateNicknameForm;
  passwordForm: UserUpdatePasswordForm;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
const initialState = {
  user: {},
  loading: 'idle',
  passwordForm: { currentPw: '', newPw: '' },
  nickNameForm: { userNickname: '' },
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initialize: (state, action) => {
      state.nickNameForm.userNickname = '';
    },
    changeNicknameForm: (state, action: PayloadAction<string>) => {
      state.nickNameForm.userNickname = action.payload;
    },
    changeCurrentPassword: (state, action: PayloadAction<string>) => {
      state.passwordForm.currentPw = action.payload;
    },
    changeNewPassword: (state, action: PayloadAction<string>) => {
      state.passwordForm.newPw = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserByToken.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(fetchUserByToken.rejected, (state, action) => {
      // state.error = action.payload ? action.payload.errorMessage : action.error;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      console.log('비밀번호가 일치하지 않습니다!');
    });
    builder.addCase(updateNickname.fulfilled, (state, { payload = '' }) => {
      state.user.userNickname = payload;
      state.nickNameForm.userNickname = '';
    });
    builder.addCase(updateNickname.rejected, (state, action) => {
      state.nickNameForm.userNickname = '';
    });
  },
});

export const {
  initialize,
  changeNicknameForm,
  changeCurrentPassword,
  changeNewPassword,
} = userSlice.actions;
export default userSlice;
