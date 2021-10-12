import React, { useContext } from 'react';
import { useFormik } from 'formik';
import cn from 'classnames';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { loginSchema } from '../validation/validation.js';
import routes from '../routes.js';
import { authContext } from '../context/index.js';

const Loginform = () => {
  const { logIn } = useContext(authContext);
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        const { token, username } = data;
        logIn(token, username);
      } catch {
        formik.handleReset();
        formik.setErrors({ username: 'Не верный логин или пароль', password: 'Не верный логин или пароль' });
      }
    },
  });

  const classesForFieldLogin = cn('form-control', 'br', { 'is-invalid': !!formik.errors.username });
  const classesForFieldPass = cn('form-control', 'br', { 'is-invalid': !!formik.errors.password });

  return (
    <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('loginForm.header')}</h1>
      <div className="form-floating mb-3 form-group">
        <input
          className={classesForFieldLogin}
          placeholder={t('loginForm.placeholderNik')}
          autoComplete="username"
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="username">{t('loginForm.placeholderNik')}</label>
        {formik.errors.username ? (
          <div className="invalid-tooltip-custom">{formik.errors.username}</div>
        ) : null}
      </div>
      <div
        className="form-floating mb-3 form-group"
      >
        <input
          className={classesForFieldPass}
          placeholder={t('loginForm.password')}
          id="password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label htmlFor="password">{t('loginForm.placeholderPass')}</label>
        {formik.errors.password ? (
          <div className="invalid-tooltip-custom">{formik.errors.password}</div>
        ) : null}
      </div>
      <button
        type="submit"
        className="w-100 mb-3 btn btn-outline-primary br"
      >
        {t('loginForm.login')}
      </button>
    </form>
  );
};

export default Loginform;
