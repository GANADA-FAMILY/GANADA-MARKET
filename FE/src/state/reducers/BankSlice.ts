import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from 'api/userAPI';
import { Bank } from 'types/Entity/UserAPI';
import BankForm from 'types/Form/BankForm';
import Payload from 'types/Form/Payload';

// 정산계좌 조회
export const getBank = createAsyncThunk('api/user/bank', async () => {
  const response = await userAPI.getBank();
  console.log(response.data);
  return response.data;
});

// 계좌 등록 및 수정
export const updateBank = createAsyncThunk(
  'api/user/bank/',
  async (payload: Payload<BankForm>) => {
    await userAPI.updateBank(payload);
    const response = await userAPI.getBank();
    console.log(response.data);
    return response.data;
  },
);

interface BankState {
  bank: Bank;
}

const initialState = {
  bank: { bank: '', bankNum: '', bankHolder: '' },
} as BankState;

export const BankSlice = createSlice({
  name: 'addressbook',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBank.fulfilled, (state, { payload }) => {
      state.bank = payload;
    });
    builder.addCase(getBank.rejected, (state, { payload }) => {
      console.log('오류!');
    });
    builder.addCase(updateBank.fulfilled, (state, { payload }) => {
      state.bank = payload;
    });
    builder.addCase(updateBank.rejected, (state, { payload }) => {
      console.log('오류!');
    });
  },
});

export default BankSlice;
