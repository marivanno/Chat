import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import NoMatch from './NoMatch.jsx';
import Nav from './Nav.jsx';
import Chat from '../pages/Chat.jsx';

import { authContext } from '../context/index.js';

import AuthProvider from '../providers/AuthProvider.jsx';

const PrivateSection = ({ children, path }) => {
  const { loginInformation } = useContext(authContext);
  return (
    <Route path={path}>
      {
        loginInformation.status ? children : <Redirect to="/login" />
      }
    </Route>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Nav />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
          <PrivateSection exect path="/">
            <Chat />
          </PrivateSection>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </AuthProvider>
  </Router>
);

export default App;
