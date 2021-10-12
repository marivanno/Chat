import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import signup from '../img/signup.jpg';
import SignupForm from '../components/SignupFrom.jsx';

const Signup = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={signup} alt="signup" />
              </div>
              <SignupForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-right">
                <Link to="/Login">{t('registrationForm.comeBack')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default Signup;
