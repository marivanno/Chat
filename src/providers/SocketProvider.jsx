import React from 'react';
import { socketContext } from '../context/index.js';

const SocketProvider = ({ children, socket }) => {
  const socketActions = {
    addNewChannel: (channel) => socket.emit('newChannel', channel),
    removeChannel: (id) => socket.emit('removeChannel', id),
    renameChannel: (iDAndName) => socket.emit('renameChannel', iDAndName),
    addNewMessage: (message) => socket.emit('newMessage', message),
  };

  const listener = (reduxAction, type) => {
    socket.on(type, (resp) => {
      reduxAction(resp);
    });
  };

  const disconnectSocket = () => {
    socket.off();
  };

  return (
    <socketContext.Provider value={{ socketActions, listener, disconnectSocket }}>
      { children }
    </socketContext.Provider>
  );
};

export default SocketProvider;
