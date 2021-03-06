import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const useSchema = () => {
  const { t } = useTranslation();

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, t('errors.tooShort'))
      .required(t('errors.reqToFill')),
    password: Yup.string()
      .min(5, t('errors.passTooShort'))
      .required(t('errors.reqToFill')),
  });

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, t('errors.tooShort'))
      .matches('^[a-zA-Z0-9]+$', t('errors.loginHasToHas'))
      .required(t('errors.reqToFill')),
    password: Yup.string()
      .min(5, t('errors.passTooShort'))
      .required(t('errors.reqToFill')),
    confimpass: Yup.string()
      .oneOf([Yup.ref('password')], t('errors.passwordMissMatch')).required(t('errors.reqToFill')),
  });

  return { loginSchema, signupSchema };
};

export default useSchema;

