import React, { useEffect, useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions as modalActions } from '../slices/modalInfo.js';
import { socketContext } from '../context/index.js';

const mapStateToProps = (state) => (
  { modal: state.modal }
);
const actions = {
  closeModal: modalActions.openModalRenameChannel,
};

const ModalWindowRename = ({ modal, closeModal, value }) => {
  const { t } = useTranslation();
  const { isOpen } = modal;
  const { extra } = value;
  const { renameChannel } = useContext(socketContext).socketActions;
  const handleClose = () => closeModal();

  const handleSubmit = (name) => {
    const dataForSend = {
      id: extra.id,
      name,
    };
    renameChannel(dataForSend);
  };

  const input = useRef();
  useEffect(() => {
    input.current.value = extra.name;
    setTimeout(() => {
      input.current.select();
    })
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({ name }) => {
      handleSubmit(name);
      handleClose();
    },
  });

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modalWindows.renameChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            name="name"
            id="name"
            ref={input}
            placeholder={t('modalWindows.placeholderNewChannel')}
            className="border-0 p-2 ps-2 form-control"
            onChange={formik.handleChange}
            value={formik.values.name}
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
            {t('modalWindows.buttonRename')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default connect(mapStateToProps, actions)(ModalWindowRename);


  //   const handleType = {
  //     addChannel: {
  //       description: 'Хотите добавить новый канал?',
  //       classes: 'primary',
  //       button: 'Добавить',
  //     },
  //     removeChannel: {
  //       description: 'Хотите удалить текущий канал?',
  //       classes: 'danger',
  //       button: 'Удалить',
  //     },
  //     renameChannel: {
  //       description: 'Хотите переименовать текущий канал?',
  //       button: 'Переименовать',
  //     },
  //   };