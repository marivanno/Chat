import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../img/img1.jpg';
import Loginform from '../components/Loginform.jsx';

const Login = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img className="rounded-circle" src={img1} alt="Войти" />
            </div>
            <Loginform />
          </div>
          <div className="card-footer p-4">
            <div className="text-right">
              <span>Нет аккаунта? </span>
              <Link to="/Signup">Регистрация</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
