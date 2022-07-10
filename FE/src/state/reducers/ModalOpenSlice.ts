import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const ModalOpenSlice = createSlice({
  name: 'modalopen',
  initialState,
  reducers: {
    openModal() {
      return true;
    },
    closeModal() {
      return false;
    },
  },
});

export const { openModal, closeModal } = ModalOpenSlice.actions;
export default ModalOpenSlice;
