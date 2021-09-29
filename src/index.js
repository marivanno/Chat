/* eslint-disable react/jsx-no-undef */
// @ts-check
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App.jsx';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './css/customstyle.css';

import rootReducer from './reducers/index.js';

const store = configureStore({
  reducer: rootReducer,
}) 

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

/* eslint-enable */

render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#chat'),
);

console.log('it works!');
