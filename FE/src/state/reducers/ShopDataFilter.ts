import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const name = 'ShopNavFilter';

type ShopDataFilterType = {
  filterArray: { filterArray: string[] };
};

const initialState: ShopDataFilterType = {
  filterArray: { filterArray: [] },
};

export const ShopDataFilterSlice = createSlice({
  name,
  initialState,
  reducers: {
    setShopDataFilter: (
      state,
      action: PayloadAction<{ filterArray: string[] }>,
    ) => {
      // eslint-disable-next-line no-param-reassign
      state.filterArray.filterArray = action.payload.filterArray;
    },
    dataReset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setShopDataFilter, dataReset } = ShopDataFilterSlice.actions;
