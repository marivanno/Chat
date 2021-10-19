import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import cn from 'classnames';
import axios from 'axios';
import routes from '../routes.js';
import useSchema from '../validation/validation.js';
import { authContext } from '../context/index.js';

const SignupForm = () => {
  const { signupSchema } = useSchema();
  const { logIn } = useContext(authContext);
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confimpass: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.signupPath(), values);
        const { token, username } = data;
        logIn(token, username);
      } catch (error) {
        if (error.response.data.message === 'Conflict') {
          formik.handleReset();
          formik.setErrors({ username: t('errors.userExists'), password: t('errors.userExists'), });
        } else {
          formik.handleReset();
          formik.setErrors({ username: t('errors.somethingWrong'), password: t('errors.updatePage') });
        }
      }
    },
  });

  const classesForFieldLogin = cn('br', { 'is-invalid': !!formik.errors.username });
  const classesForFieldPass = cn('br', { 'is-invalid': !!formik.errors.password });
  const classesForFieldconfimpass = cn('form-control', 'br', { 'is-invalid': !!formik.errors.confimpass });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('registrationForm.header')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          className={classesForFieldLogin}
          placeholder={t('registrationForm.placeholderNik')}
          autoComplete="username"
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <Form.Label htmlFor="username">{t('loginForm.placeholderNik')}</Form.Label>
        {formik.errors.username ? (
          <div className="invalid-tooltip-custom">
            {formik.errors.username}
          </div>
        ) : null }
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          className={classesForFieldPass}
          placeholder={t('registrationForm.placeholderPass')}
          id="password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Form.Label htmlFor="pass">{t('registrationForm.placeholderPass')}</Form.Label>
        {formik.errors.password ? (
          <div className="invalid-tooltip-custom">
            {formik.errors.password}
          </div>
        ) : null }
      </Form.Group>
      <div
        className="form-floating mb-3"
      >
        <Form.Control
          className={classesForFieldconfimpass}
          placeholder={t('registrationForm.placeholderconfimPass')}
          id="confimpass"
          name="confimpass"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.confimpass}
        />
        <Form.Label htmlFor="passrepit">{t('registrationForm.placeholderconfimPass')}</Form.Label>
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
        {t('registrationForm.singnUp')}
      </button>
    </Form>
  );
};

export default SignupForm;
