import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userAction from 'api/userAPI';
import { SalesHistory } from 'types/Entity/UserAPI';

export const getSalesHistory = createAsyncThunk(
  'api/user/sales-history',
  async () => {
    const response = await userAction.getSalesHistory();
    if (response.data.length < 1) return response.data;
    return response.data.salesHistory;
  },
);
export const getFilteredSalesHistory = createAsyncThunk(
  'api/user/sales-history/filtered',
  async () => {
    const response = await userAction.getSalesHistory();
    if (response.data.length < 1) return response.data;
    return response.data.salesHistory;
  },
);
interface SalesHistoryState {
  salesHistory: SalesHistory[];
  filteredsalesHistory: SalesHistory[];
  tabIndex: number;
}
const initialState = {
  salesHistory: [],
  filteredsalesHistory: [],
  tabIndex: 0,
} as SalesHistoryState;

export const SalesHistorySlice = createSlice({
  name: 'salesHistorySlice',
  initialState,
  reducers: {
    setTabIndex: (state, { payload }) => {
      state.tabIndex = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSalesHistory.fulfilled, (state, { payload }) => {
      state.salesHistory = payload;
    });
    builder.addCase(getFilteredSalesHistory.fulfilled, (state, { payload }) => {
      if (state.tabIndex >= 0) {
        payload = payload.filter(
          (o: SalesHistory) => o.status === state.tabIndex,
        );
      }
      state.filteredsalesHistory = payload;
    });
  },
});
export const { setTabIndex } = SalesHistorySlice.actions;
export default SalesHistorySlice;
