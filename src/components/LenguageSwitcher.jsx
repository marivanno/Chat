import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LenguageSwitcher = ({ className }) => {
  const { i18n } = useTranslation();
  const [state, toSwitchLeng] = useState('EN');

  useEffect(() => i18n.changeLanguage(state), [state]);

  const handlerSwitch = () => {
    toSwitchLeng((state) => {
      const newLang = state === 'EN' ? 'RU' : 'EN';
      return newLang;
    });
  };

  return (
    <Form
      className={className}
      onClick={handlerSwitch}
    >
      <Form.Check
        type="switch"
        id="custom-switch"
        label={state}
      />
    </Form>
  );
};

export default LenguageSwitcher;
