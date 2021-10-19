import React from 'react';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SocketProvider from './providers/SocketProvider.jsx';
import App from './components/App.jsx';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import './css/style.scss';
import rootReducer from './reducers/index.js';
import './i18n.js';
import './validation/validation.js';

const store = configureStore({
  reducer: rootReducer,
});

const socket = io();

const init = () => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <App />
      </SocketProvider>
    </Provider>
  );
};

export default init;
