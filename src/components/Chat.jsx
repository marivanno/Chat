import React from 'react';
import Chanels from './Chat/Chanels.jsx';
import Header from './Chat/Header.jsx';
import FormForSendMassages from './Chat/FormForSendMassages.jsx';
import MassageBox from './Chat/MassageBox.jsx';

const Chat = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <Chanels />
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <Header />
          <MassageBox />
          <FormForSendMassages />
        </div>
      </div>
    </div>

  </div>
);

export default Chat;
