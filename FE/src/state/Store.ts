import { configureStore } from '@reduxjs/toolkit';
import { ShopFilterSlice } from './reducers/ShopNavFilter';
import { ShopDataFilterSlice } from './reducers/ShopDataFilter';

const Store = configureStore({
  reducer: {
    ShopNavFilter: ShopFilterSlice.reducer,
    ShopDataFilter: ShopDataFilterSlice.reducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export default Store;
