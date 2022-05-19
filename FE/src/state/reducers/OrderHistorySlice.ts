import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userAction from 'api/userAPI';
import { OrderHistory } from 'types/Entity/UserAPI';

export const getOrderHistory = createAsyncThunk(
  'api/user/order-history',
  async () => {
    const response = await userAction.getOrderHistory();
    if (response.data.length < 1) return response.data;
    return response.data.orderHistory;
  },
);

interface OrderHistoryState {
  orderHistory: OrderHistory[];
  tabIndex: number;
}
const initialState = {
  orderHistory: [],
  tabIndex: 0,
} as OrderHistoryState;

export const OrderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
    setTabIndex: (state, { payload }) => {
      console.log(state.tabIndex);
      state.tabIndex = payload;
      console.log(state.tabIndex);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderHistory.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.orderHistory = payload;
    });
  },
});
export const { setTabIndex } = OrderHistorySlice.actions;
export default OrderHistorySlice;
