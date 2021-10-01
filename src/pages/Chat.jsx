import React from 'react';

import Channels from '../components/Chat/Channels.jsx';
import Header from '../components/Chat/Header.jsx';
import FormForSendMessages from '../components/Chat/FormForSendMessages.jsx';
import MessageBox from '../components/Chat/MessageBox.jsx';

const Chat = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <Channels />
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <Header />
          <MessageBox />
          <FormForSendMessages />
        </div>
      </div>
    </div>

  </div>
);

export default Chat;
