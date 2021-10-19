import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DropdownButtons = (
  {
    children,
    value,
  },
) => {
  const {
    classesForDropdown,
    openModalRemoveChannel,
    openModalRenameChannel,
    id,
    name,
  } = value;
  const { t } = useTranslation();
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
    >
      { children }
      <Dropdown.Toggle
        variant="btn"
        className={classesForDropdown}
      />
      <Dropdown.Menu>
        <Dropdown.Item onClick={handlerRemoveChannel}>{t('modalWindows.buttonRemove')}</Dropdown.Item>
        <Dropdown.Item onClick={handlerRenameChannel}>{t('modalWindows.buttonRename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownButtons;
