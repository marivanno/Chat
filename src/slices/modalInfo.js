import { createSlice } from '@reduxjs/toolkit';

const modalInfo = createSlice({
  name: 'modalInfo',
  initialState: {
    isOpen: false,
    type: null,
    extra: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
  },
});

export const action = modalInfo;
export default modalInfo.reducer;
