import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAction from 'api/userAPI';
import UserTest from 'types/Entity/UserTest';

export const fetchUserByToken = createAsyncThunk('api/user', async () => {
  const response = await userAction.getUser();
  return response.data;
});

interface UserState {
  user: UserTest;
  // loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
const initialState = {
  user: {},
  // loading: 'idle',
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserByToken.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(fetchUserByToken.rejected, (state, action) => {
      // state.error = action.payload ? action.payload.errorMessage : action.error;
    });
  },
});

export default userSlice;
