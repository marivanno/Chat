import React, { useEffect, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Header from '../components/Chat/Header.jsx';
import Channels from '../components/Chat/Channels.jsx';
import FormForSendMessages from '../components/Chat/FormForSendMessages.jsx';
import MessageBox from '../components/Chat/MessageBox.jsx';
import ModalWindow from '../components/ModalWindow.jsx';
import ModalWindowRemove from '../components/ModalWindowRemove.jsx';
import ModalWindowRename from '../components/ModalWindowRename.jsx';
import { socketContext } from '../context/index.js';
import { actions as massageInfoActions } from '../slices/messagesInfo.js';
import { actions as channelsInfoActions } from '../slices/channelsInfo.js';

const actions = {
  addMessage: massageInfoActions.addMessage,
  addChannel: channelsInfoActions.addChannel,
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
    <Container className="h-100 my-4 overflow-hidden rounded shadow colum">
      <Row className="h-100 bg-white">
        <Channels className="chennals-left col-lg-2 border-end pt-5 px-0 bg-light" />
        <Col className="col-lg-10 col-md-12 p-0 h-100">
          <Col className="d-flex flex-column h-100">
            <Channels className="chennals-top col-md-12 pt-4 px-0 bg-light shadow-sm" />
            <Header className="hdr bg-light mb-4 p-3 shadow-sm small" />
            <MessageBox className="overflow-auto px-5" />
            <FormForSendMessages className="mt-auto px-5 py-3" />
            {isOpen && type === 'addChannel' && <ModalWindow /> }
            {isOpen && type === 'removeChannel' && <ModalWindowRemove value={{ extra }} /> }
            {isOpen && type === 'renameChannel' && <ModalWindowRename value={{ extra }} /> }
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default connect(mapStateToProps, actions)(Chat);
