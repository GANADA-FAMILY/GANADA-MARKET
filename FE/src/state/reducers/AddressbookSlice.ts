import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userAPI from 'api/userAPI';
import { Address } from 'types/Entity/UserAPI';

export const getAddressbook = createAsyncThunk(
  'api/user/addressbook',
  async () => {
    const response = await userAPI.getAddressbook();
    return response.data.addressBookList;
  },
);

export const deleteAddressbook = createAsyncThunk(
  'api/user/addressbook/:addressId',
  async (payload: string) => {
    await userAPI.deleteAddressbook(payload);
    const response = await userAPI.getAddressbook();
    return response.data.addressBookList;
  },
);

export const updateRepresentAddressbook = createAsyncThunk(
  'api/user/addressbook/represent/:addressId',
  async (payload: string) => {
    await userAPI.updateRepresentAddressbook(payload);
    const response = await userAPI.getAddressbook();
    return response.data.addressBookList;
  },
);

interface AddressbookState {
  addressbook: Address[];
}

const initialState = {
  addressbook: [],
} as AddressbookState;

export const AddressbookSlice = createSlice({
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
      state.addressbook = payload;
    });
    builder.addCase(
      updateRepresentAddressbook.fulfilled,
      (state, { payload }) => {
        state.addressbook = payload;
      },
    );
  },
});

export default AddressbookSlice;
