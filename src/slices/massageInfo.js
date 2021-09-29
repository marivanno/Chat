import { createSlice } from '@reduxjs/toolkit';

const massageInfo = createSlice({
  name: 'massageInfo',
  initialState: {
    massages: [],
  },
  reducers: {
    addMassage: (state, action) => {
      state.massages.push(action.payload);
    },
  },
});
export const { actions } = massageInfo;
export default massageInfo.reducer;

