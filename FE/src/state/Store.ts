import { configureStore } from '@reduxjs/toolkit';
import { ShopFilterSlice } from './reducers/ShopNavFilter';
import { ShopDataFilterSlice } from './reducers/ShopDataFilter';
import UserSlice from './reducers/UserSlice';
import AddressbookSlice from './reducers/AddressbookSlice';
import BankSlice from './reducers/BankSlice';
import WishSlice from './reducers/WishSlice';
import OrderHistorySlice from './reducers/OrderHistorySlice';

const Store = configureStore({
  reducer: {
    ShopNavFilter: ShopFilterSlice.reducer,
    ShopDataFilter: ShopDataFilterSlice.reducer,
    user: UserSlice.reducer,
    addressbook: AddressbookSlice.reducer,
    bank: BankSlice.reducer,
    wishList: WishSlice.reducer,
    orderHistory: OrderHistorySlice.reducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;
