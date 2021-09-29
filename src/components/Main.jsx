import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import authContext from '../context/index.js';

const Main = () => {
  const content = useContext(authContext)
  const handleClick = () => {
    console.log(content)
  }
  return (
    <Link to="/login">
      <button type="button" className="btn btn-primary" onClick={handleClick}>Primary</button>
    </Link>
  )
};

export default Main;
