import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next'
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions as modalActions } from '../slices/modalInfo.js';
import { socketContext } from '../context/index.js';

const mapStateToProps = (state) => (
  { modal: state.modal }
);
const actions = {
  closeModal: modalActions.openModalRemoveChannel,
};

const ModalWindowRemove = ({ modal, closeModal, value }) => {
  const { t } = useTranslation()
  const { isOpen } = modal;
  const { extra } = value;
  const { removeChannel } = useContext(socketContext).socketActions;
  const handleClose = () => closeModal();

  const handlerSubmit = () => {
    removeChannel({ id: extra });
    console.log(removeChannel);
    handleClose();
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>{t('modalWindows.removeChannnel')}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
          >
            {t('modalWindows.buttonClose')}
          </Button>
          <Button
            onClick={handlerSubmit}
            variant="danger"
          >
            {t('modalWindows.buttonRemove')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default connect(mapStateToProps, actions)(ModalWindowRemove);