import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userAction from 'api/userAPI';
import { Wish } from 'types/Entity/UserAPI';

export const getWishList = createAsyncThunk('api/user/likelist', async () => {
  const response = await userAction.getWishList();
  return response.data.auctionList;
});

export const deleteWish = createAsyncThunk(
  'api/auction/like',
  async (payload: string) => {
    await userAction.deleteWish(payload);
    const response = await userAction.getWishList();
    return response.data.auctionList;
  },
);

interface WishState {
  wishList: Wish[];
}
const initialState = {
  wishList: [],
} as WishState;

export const WishSlice = createSlice({
  name: 'wishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWishList.fulfilled, (state, { payload }) => {
      state.wishList = payload;
    });
    builder.addCase(getWishList.rejected, (state, { payload }) => {
      console.log('오류!');
    });
    builder.addCase(deleteWish.fulfilled, (state, { payload }) => {
      state.wishList = payload;
    });
  },
});

export default WishSlice;
