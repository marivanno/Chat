import React, { useContext } from 'react';
import { Container, Nav as NavBootstrap, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LenguageSwitcher from './LenguageSwitcher.jsx';
import { authContext, socketContext } from '../context';

const Nav = () => {
  const { t } = useTranslation();
  const { logOut, loginInformation } = useContext(authContext);
  const { disconnectSocket } = useContext(socketContext);

  const handlclickLogOut = () => {
    logOut();
    disconnectSocket();
  };

  return (
    <NavBootstrap className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Link className="navbar-brand" to="/">Chat</Link>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <LenguageSwitcher className="p-2" />
            {
          loginInformation.status ? (
            <Button variant="primary" onClick={handlclickLogOut}>
              {
            t('messageChat.logOut')
            }
            </Button>
          ) : null
          }
          </div>
        </div>
      </Container>
    </NavBootstrap>
  );
};

export default Nav;
