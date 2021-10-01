import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import authContext from '../context/index.js';
import getInitState from '../getInitialStateForAuthProvider.js';

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(getInitState());

  const history = useHistory();

  const logIn = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setState({ token, username });
    history.replace('/');
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setState({ token: null, username: null });
    history.replace('/Login');
  };

  const loginInformation = { token: state.token, status: !!state.token, username: state.username };
  return (
    <authContext.Provider value={{ logIn, logOut, loginInformation }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
