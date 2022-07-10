import { configureStore } from '@reduxjs/toolkit';
import { ShopFilterSlice } from './reducers/ShopNavFilter';
import { ShopDataFilterSlice } from './reducers/ShopDataFilter';
import UserSlice from './reducers/UserSlice';
import { paySlice } from './reducers/PaySlice';
import AddressbookSlice from './reducers/AddressbookSlice';
import BankSlice from './reducers/BankSlice';
import WishSlice from './reducers/WishSlice';
import OrderHistorySlice from './reducers/OrderHistorySlice';
import SalesHistorySlice from './reducers/SalesHistorySlice';
import SellingSlice from './reducers/SellingSlice';
import ModalOpenSlice from './reducers/ModalOpenSlice';

const Store = configureStore({
  reducer: {
    ShopNavFilter: ShopFilterSlice.reducer,
    ShopDataFilter: ShopDataFilterSlice.reducer,
    user: UserSlice.reducer,
    pay: paySlice.reducer,
    addressbook: AddressbookSlice.reducer,
    bank: BankSlice.reducer,
    wishList: WishSlice.reducer,
    orderHistory: OrderHistorySlice.reducer,
    salesHistory: SalesHistorySlice.reducer,
    sellingList: SellingSlice.reducer,
    modalOpen: ModalOpenSlice.reducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;
