import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const name = 'ShopNavFilter';

type ShopNavFilterType = {
  filter: { name: string };
};

const initialState: ShopNavFilterType = {
  filter: { name: 'time' },
};

export const ShopFilterSlice = createSlice({
  name,
  initialState,
  reducers: {
    setNavFilter: (state, action: PayloadAction<{ name: string }>) => {
      // eslint-disable-next-line no-param-reassign
      state.filter.name = action.payload.name;
    },
    navReset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setNavFilter, navReset } = ShopFilterSlice.actions;
