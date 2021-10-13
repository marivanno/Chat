import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import getAuthInformation from '../getInitialStateForAuthProvider.js';
import routes from '../routes.js';


export const fetchMessages = createAsyncThunk(
  'messagesInfo/fetchMessages',
  async () => {
    const authHeaders = `Bearer ${getAuthInformation().token}`;
    const resp = await axios.get(routes.dataPath(), { headers: { Authorization: authHeaders } });
    return resp.data;
  },
);

const messagesInfo = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
    status: null,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: {
    [fetchMessages.pending]: (state) => {
      state.status = 'pending';
    },
    [fetchMessages.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.messages = action.payload.messages;
    },
    [fetchMessages.rejected]: (state) => {
      state.status = 'rejected';
      state.error = 'Что-то пошло не так, попробуйте обновить страницу...';
    },
  },
});

export const selectActiveChannelMessages = createSelector(
  [
    (state) => state.messageInfo.messages,
    (state) => state.channelsInfo.currentChannelId,
  ],
  (messages, id) => messages.filter((message) => message.channelId === id),
);

export const { actions } = messagesInfo;
export default messagesInfo.reducer;
