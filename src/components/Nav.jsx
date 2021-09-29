import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../context';

const Nav = () => {
  const { logOut, loginInformation } = useContext(authContext);

  const handlclickLogOut = () => {
    logOut();
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">Chat</Link>
        {loginInformation.status ? <button type="button" className="btn btn-primary" onClick={handlclickLogOut}>Выйти</button> : null }
      </div>
    </nav>
  )
};

export default Nav;
