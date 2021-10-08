import React, { useContext } from 'react';
import { ErrorMessage, useFormik } from 'formik';
import cn from 'classnames';
import axios from 'axios';
import routes from '../routes.js';
import { signupSchema } from '../validation/validation.js';
import { authContext } from '../context/index.js';

const SignupForm = () => {
  const { logIn } = useContext(authContext);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confimpass: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const data = await axios.post(routes.signupPath(), values);
        const { token, username } = data.data;
        logIn(token, username);
      } catch (error) {
        if (error.response.data.message === 'Conflict') {
          formik.handleReset();
          formik.setErrors({ username: 'Пользователь существует', password: 'Пользователь существует' });
        } else {
          formik.handleReset();
          formik.setErrors({ username: 'Что-то пошло не так, попробуйте снова', password: 'скорее всего что-то с вашим соединением с интернетом' });
        }
      }
    },
  });

  const classesForFieldLogin = cn('form-control', 'br', { 'is-invalid': !!formik.errors.username });
  const classesForFieldPass = cn('form-control', 'br', { 'is-invalid': !!formik.errors.password });
  const classesForFieldconfimpass = cn('form-control', 'br', { 'is-invalid': !!formik.errors.confimpass });

  return (
    <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Регистрация</h1>
      <div className="form-floating mb-3 form-group">
        <input
          className={classesForFieldLogin}
          placeholder="Имя пользователя"
          autoComplete="username"
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="username">Имя пользователя</label>
        {formik.errors.username ? (
          <div className="invalid-tooltip-custom">
            {formik.errors.username}
          </div>
        ) : null }
      </div>
      <div
        className="form-floating mb-3 form-group"
      >
        <input
          className={classesForFieldPass}
          placeholder="Ваш пароль"
          id="password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label htmlFor="pass">Пароль</label>
        {formik.errors.password ? (
          <div className="invalid-tooltip-custom">
            {formik.errors.password}
          </div>
        ) : null }
      </div>
      <div
        className="form-floating mb-3 form-group"
      >
        <input
          className={classesForFieldconfimpass}
          placeholder="Повторите пароль"
          id="confimpass"
          name="confimpass"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.confimpass}
        />
        <label htmlFor="passrepit">Подтвердите пароль</label>
        {formik.errors.confimpass ? (
          <div className="invalid-tooltip-custom">
            {formik.errors.confimpass}
          </div>
        ) : null }
      </div>
      <button
        type="submit"
        className="w-100 mb-3 btn btn-outline-primary br"
        disabled={Object.keys(formik.errors).length !== 0}
      >
        Зарегестрироваться
      </button>
    </form>
  );
};

export default SignupForm;
