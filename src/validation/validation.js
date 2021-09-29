import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Слишком короткий логин!')
    .required('Обязательно к заполнению'),
  password: Yup.string()
    .min(5, 'Слишком короткий пароль!')
    .required('Обязательно к заполнению'),
});

const signupSchema = Yup.object().shape({
  nickname: Yup.string()
    .min(5, 'Слишком короткий логин!')
    .matches('^[a-zA-Z0-9]+$', 'Логин должен содержать только буквы и цифры')
    .required('Обязательно к заполнению'),
  pass: Yup.string()
    .min(5, 'Слишком короткий пароль!')
    .required('Обязательно к заполнению'),
  confimpass: Yup.string()
    .oneOf([Yup.ref('pass')], 'Пароли не совпадают').required('Обязательно к заполнению')
});


export { loginSchema, signupSchema }