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

export const deleteAddressbook = createAsyncThunk(
  'api/user/addressbook/:addressId',
  async (payload: string) => {
    const response = await userAPI.deleteAddressbook(payload);
    console.log(response.data);
    return response.data.addressBookList;
  },
);

export const updateRepresentAddressbook = createAsyncThunk(
  'api/user/addressbook/represent/:addressId',
  async (payload: string) => {
    console.log(payload);
    const response = await userAPI.updateRepresentAddressbook(payload);
    console.log(response.data);
    return response.data.addressBookList;
  },
);

interface AddressbookState {
  addressbook: Address[];
}

const initialState = {
  addressbook: [],
} as AddressbookState;

export const addressbookSlice = createSlice({
  name: 'addressbook',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAddressbook.fulfilled, (state, { payload }) => {
      state.addressbook = payload;
    });
    builder.addCase(getAddressbook.rejected, (state, { payload }) => {
      console.log('오류발생!');
    });
    builder.addCase(deleteAddressbook.fulfilled, (state, { payload }) => {
      console.log('삭제 성공!');
      // state.addressbook = payload;
    });
  },
});

export default addressbookSlice;
