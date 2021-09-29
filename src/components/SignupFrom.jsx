import React from 'react';
import { useFormik } from 'formik';
import cn from 'classnames';
import { signupSchema } from '../validation/validation.js';

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      nickname: '',
      pass: '',
      confimpass: '',
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const classesForFieldLogin = cn('form-control', 'br', { 'is-invalid': !!formik.errors.nickname });
  const classesForFieldPass = cn('form-control', 'br', { 'is-invalid': !!formik.errors.pass });
  const classesForFieldconfimpass = cn('form-control', 'br', { 'is-invalid': !!formik.errors.confimpass });

  return (
    <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Регистрация</h1>
      <div className="form-floating mb-3 form-group">
        <input
          className={classesForFieldLogin}
          placeholder="Имя пользователя"
          autoComplete="nickname"
          id="nickname"
          name="nickname"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.nickname}
        />
        <label htmlFor="nickname" />
        {formik.errors.nickname ? (
          <div className="invalid-tooltip-custom">
            {formik.errors.nickname}
          </div>
        ) : null }
      </div>
      <div
        className="form-floating mb-3 form-group"
      >
        <input
          className={classesForFieldPass}
          placeholder="Ваш пароль"
          id="pass"
          name="pass"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.pass}
        />
        <label htmlFor="pass" />
        {formik.errors.pass ? (
          <div className="invalid-tooltip-custom">
            {formik.errors.pass}
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
        <label htmlFor="passrepit" />
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
