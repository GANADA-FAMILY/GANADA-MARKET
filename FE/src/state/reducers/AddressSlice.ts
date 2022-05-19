import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userAPI from 'api/userAPI';
import { Address } from 'types/Entity/UserAPI';

export const getAddressbook = createAsyncThunk(
  'api/user/addressbook',
  async () => {
    const response = await userAPI.getAddressbook();
    console.log(response.data);
    return response.data.addressBookList;
  },
);

interface AddressState {
  addressList: Address[];
}

const initialState = {
  addressList: [],
} as AddressState;

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAddressbook.fulfilled, (state, { payload }) => {
      state.addressList = payload;
    });
  },
});
