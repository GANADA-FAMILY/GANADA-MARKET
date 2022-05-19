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
  },
});

export default addressbookSlice;
