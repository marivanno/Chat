import { combineReducers } from '@reduxjs/toolkit';

import massageInfo from '../slices/massageInfo.js';
import chanelsInfo from '../slices/chanelsInfo.js';
import modal from '../slices/modalInfo.js';

const rootReducer = combineReducers({
  massageInfo,
  chanelsInfo,
  modal,
});

export default rootReducer;
