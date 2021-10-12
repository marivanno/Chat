import React, { useEffect, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions as modalActions } from '../slices/modalInfo.js';
import { socketContext } from '../context/index.js';

const mapStateToProps = (state) => (
  { modal: state.modal }
);
const actions = {
  closeModal: modalActions.openModalAddChannel,
};

const ModalWindow = ({ modal, closeModal }) => {
  const { t } = useTranslation()
  const { isOpen, type } = modal;
  const { addNewChannel } = useContext(socketContext).socketActions;
  const handleClose = () => closeModal();

  const handleSubmit = ({ newChannel }) => {
    const channelForSend = {
      name: newChannel,
    };
    addNewChannel(channelForSend);
  };

  const input = useRef();
  useEffect(() => {
    setTimeout(() => type === 'removeChannel' || input.current.focus());
  }, []);

  const formik = useFormik({
    initialValues: {
      newChannel: '',
    },
    onSubmit: (values) => {
      formik.resetForm();
      handleSubmit(values);
      handleClose();
    },
  });

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modalWindows.newChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            name="newChannel"
            id="newChannel"
            ref={input}
            placeholder={t('modalWindows.placeholderNewChannel')}
            className="border-0 p-2 ps-2 form-control"
            onChange={formik.handleChange}
            value={formik.values.newChannel}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
          >
            {t('modalWindows.buttonClose')}
          </Button>
          <Button
            type="submit"
            variant="primary"
          >
            {t('modalWindows.buttonAdd')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default connect(mapStateToProps, actions)(ModalWindow);
