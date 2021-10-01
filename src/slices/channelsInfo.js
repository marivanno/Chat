import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';
import getAuthInformation from '../getInitialStateForAuthProvider.js';
// import { action } from './modalInfo.js';

export const fetchChannels = createAsyncThunk(
  'channelsInfo/fetchChannels',
  async () => {
    const authHeaders = `Bearer ${getAuthInformation().token}`;
    const resp = await axios.get(routes.dataPath(), { headers: { Authorization: authHeaders } });
    return resp.data;
  },
);

const channelsInfo = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: 1,
    status: null,
    error: null,
  },
  reducers: {
    addChannels: (state, action) => {
      state.channels.push(action.payload);
    },
    changeChannels: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: {
    [fetchChannels.pending]: (state) => {
      state.status = 'pending';
    },
    [fetchChannels.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.channels = action.payload.channels;
    },
    [fetchChannels.rejected]: (state) => {
      state.status = 'rejected';
      state.error = 'Что-то пошло не так, попробуйте обновить страницу...';
    },
  },
});

export const getCurrentChannel = createSelector(
  [
    (state) => state.channelsInfo.channels,
    (state) => state.channelsInfo.currentChannelId,
  ],
  (channels, currentChannelId) => channels.filter((channel) => channel.id === currentChannelId)[0],
);

export const { actions } = channelsInfo;
export default channelsInfo.reducer;
