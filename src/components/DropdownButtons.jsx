import React from 'react';
import { Dropdown } from 'react-bootstrap';

const DropdownButtons = ({ children, value }) => {
  const {
    classesForDropdown, openModalRemoveChannel, openModalRenameChannel, id, name,
  } = value;

  const handlerRemoveChannel = () => {
    openModalRemoveChannel(id);
  };

  const handlerRenameChannel = () => {
    openModalRenameChannel({ name, id });
  };
  return (
    <Dropdown
      className="d-flex"
      role="group"
      drop="end"
    >
      { children }
      <Dropdown.Toggle
        variant="btn"
        className={classesForDropdown}
      />

      <Dropdown.Menu>
        <Dropdown.Item onClick={handlerRemoveChannel}>Удалить</Dropdown.Item>
        <Dropdown.Item onClick={handlerRenameChannel}>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownButtons;
