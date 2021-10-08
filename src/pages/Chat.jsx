import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';

import Channels from '../components/Chat/Channels.jsx';
import Header from '../components/Chat/Header.jsx';
import FormForSendMessages from '../components/Chat/FormForSendMessages.jsx';
import MessageBox from '../components/Chat/MessageBox.jsx';
import ModalWindow from '../components/ModalWindow.jsx';
import ModalWindowRemove from '../components/ModalWindowRemove.jsx';
import ModalWindowRename from '../components/ModalWindowRename.jsx';
import { socketContext } from '../context/index.js';
import { actions as massageInfoActions } from '../slices/messageInfo.js';
import { actions as channelsInfoActions } from '../slices/channelsInfo.js';

const actions = {
  addMessage: massageInfoActions.addMessage,
  addChannel: channelsInfoActions.addChannels,
  removeChannel: channelsInfoActions.removeChannel,
  renameChannel: channelsInfoActions.renameChannel,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
  extra: state.modal.extra,
});

const Chat = ({
  addMessage, addChannel, modal, extra, removeChannel, renameChannel,
}) => {
  const { listener } = useContext(socketContext);
  const { isOpen, type } = modal;

  useEffect(() => {
    listener(addMessage, 'newMessage');
    listener(addChannel, 'newChannel');
    listener(removeChannel, 'removeChannel');
    listener(renameChannel, 'renameChannel');
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Header />
            <MessageBox />
            <FormForSendMessages />
            {isOpen && type === 'addChannel' && <ModalWindow /> }
            {isOpen && type === 'removeChannel' && <ModalWindowRemove value={{ extra }} /> }
            {isOpen && type === 'renameChannel' && <ModalWindowRename value={{ extra }} /> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, actions)(Chat);
