import { createSlice } from '@reduxjs/toolkit';

const modalInfo = createSlice({
  name: 'modalInfo',
  initialState: {
    isOpen: false,
    type: null,
    extra: null,
  },
  reducers: {
    openModalAddChannel: (state) => {
      state.isOpen = !state.isOpen;
      state.type = state.type === 'addChannel' ? null : 'addChannel';
    },
    openModalRemoveChannel: (state, action) => {
      state.isOpen = !state.isOpen;
      state.type = state.type === 'removeChannel' ? null : 'removeChannel';
      state.extra = action.payload;
    },
    openModalRenameChannel: (state, action) => {
      state.isOpen = !state.isOpen;
      state.type = state.type === 'renameChannel' ? null : 'renameChannel';
      state.extra = action.payload;
    }
  },
});

export const { actions } = modalInfo;
export default modalInfo.reducer;
