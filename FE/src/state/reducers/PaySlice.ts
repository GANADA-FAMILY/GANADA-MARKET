import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'state/Store';
import PayReadyForm from 'types/Form/PayReadyForm';

interface PayState {
  payInfo: PayReadyForm;
}

interface Payload {
  auctionId: number;
  buyerName: string;
  phone: string;
  postalCode: string;
  address: string;
  addressDetail: string;
}

const initialState: PayState = {
  payInfo: {
    auctionId: 0,
    price: 0,
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
    setDelivery: (state, action: PayloadAction<PayReadyForm>) => {
      state.payInfo = action.payload;
    },
    setPrice: (state, action: PayloadAction<PayReadyForm>) => {
      state.payInfo = action.payload;
    },
    setAuction: (state, action: PayloadAction<Payload>) => {
      state.payInfo.auctionId = action.payload.auctionId;
      state.payInfo.buyerName = action.payload.buyerName;
      state.payInfo.phone = action.payload.phone;
      state.payInfo.postalCode = action.payload.postalCode;
      state.payInfo.address = action.payload.address;
      state.payInfo.addressDetail = action.payload.addressDetail;
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
