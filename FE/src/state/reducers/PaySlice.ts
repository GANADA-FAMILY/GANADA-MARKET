import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'state/Store';
import PayReadyForm from 'types/Form/PayReadyForm';
import Address from 'types/Entity/UserAPI/Address';

interface PayState {
  payInfo: PayReadyForm;
}

const initialState: PayState = {
  payInfo: {
    auctionId: 1,
    price: 1,
    paymentMethod: '',
    buyerName: '',
    phone: '',
    postalCode: '',
    address: '',
    addressDetail: '',
  },
};

export const paySlice = createSlice({
  name: 'pay',
  initialState,
  reducers: {
    setDelivery: (state, action: PayloadAction<Address>) => {
      state.payInfo.address = action.payload.address;
      state.payInfo.addressDetail = action.payload.addressDetail;
      state.payInfo.buyerName = action.payload.addressName;
      state.payInfo.phone = action.payload.addressPhone;
      state.payInfo.postalCode = action.payload.postalCode;
    },
    setPrice: (state, action: PayloadAction<PayReadyForm>) => {
      state.payInfo = action.payload;
    },
    setAuction: (
      state,
      action: PayloadAction<{ auctionId: number; price: number }>,
    ) => {
      state.payInfo.auctionId = action.payload.auctionId;
      state.payInfo.price = action.payload.price;
    },
    setPayMethod: (state, action: PayloadAction<string>) => {
      state.payInfo.paymentMethod = action.payload;
    },
  },
});

export const { setDelivery, setPrice, setAuction, setPayMethod } =
  paySlice.actions;
export const selectPayInfo = (state: RootState) => state.pay.payInfo;
export default paySlice.reducer;
