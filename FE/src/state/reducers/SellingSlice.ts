import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userAction from 'api/userAPI';
import { Selling } from 'types/Entity/UserAPI';

export const getSellingList = createAsyncThunk('api/user/selling', async () => {
  const response = await userAction.getSellingList();
  return response.data.selling;
});

interface SellingState {
  sellingList: Selling[];
}
const initialState = {
  sellingList: [],
} as SellingState;

export const SellingSlice = createSlice({
  name: 'selling',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSellingList.fulfilled, (state, { payload }) => {
      state.sellingList = payload;
    });
    builder.addCase(getSellingList.rejected, (state, { payload }) => {
      console.log('오류!');
    });
  },
});

export default SellingSlice;
