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

export const getFilteredOrderHistory = createAsyncThunk(
  'api/user/order-history/filtered',
  async () => {
    const response = await userAction.getOrderHistory();
    if (response.data.length < 1) return response.data;
    console.log(response);
    return response.data.orderHistory;
  },
);

interface OrderHistoryState {
  orderHistory: OrderHistory[];
  filteredHistory: OrderHistory[];
  tabIndex: number;
}
const initialState = {
  orderHistory: [],
  filteredHistory: [],
  tabIndex: 0,
} as OrderHistoryState;

export const OrderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
    setTabIndex: (state, { payload }) => {
      state.tabIndex = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderHistory.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.orderHistory = payload;
    });
    builder.addCase(getFilteredOrderHistory.fulfilled, (state, { payload }) => {
      if (state.tabIndex >= 0) {
        payload = payload.filter(
          (o: OrderHistory) => o.status === state.tabIndex,
        );
      }
      console.log(state.tabIndex);
      console.log(payload);
      state.filteredHistory = payload;
    });
  },
});
export const { setTabIndex } = OrderHistorySlice.actions;
export default OrderHistorySlice;
