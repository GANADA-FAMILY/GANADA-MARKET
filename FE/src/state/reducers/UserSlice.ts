import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import User from 'types/Entity/User';

const fetchUserByToken = createAsyncThunk('api/user', async () => {
  const response = { data: {} };
  return response.data;
});

interface UserState {
  user: User;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
const initialState = {
  user: {},
  loading: 'idle',
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(fetchUserByToken.fulfilled, (state, action) => {
    //   return (state.user = action.payload);
    // });
  },
});
export { fetchUserByToken };

export default userSlice.reducer;
