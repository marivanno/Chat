import { combineReducers } from '@reduxjs/toolkit';

import messageInfo from '../slices/messageInfo.js';
import channelsInfo from '../slices/channelsInfo.js';
import modal from '../slices/modalInfo.js';

const rootReducer = combineReducers({
  messageInfo,
  channelsInfo,
  modal,
});

export default rootReducer;
