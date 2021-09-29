import { createSlice } from '@reduxjs/toolkit';

const chanelsInfo = createSlice({
  name: 'chanelsInfo',
  initialState: {
    chanels: [],
    currentChanelId: 1,
  },
  reducers: {
    addChanels: (state, action) => {
      state.chanels.push(action.payload);
    },
  },
});
export const { actions } = chanelsInfo;
export default chanelsInfo.reducer;
