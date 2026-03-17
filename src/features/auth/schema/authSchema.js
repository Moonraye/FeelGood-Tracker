import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(8, "Password may be 8 characters or more")
        .required('Password is required'),
});

export const registerSchema = Yup.object({
  email: Yup.string()
    .email('Введіть коректну електронну адресу')
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(6, 'Пароль має містити мінімум 6 символів')
    .required("Обов'язкове поле"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Паролі повинні співпадати')
    .required("Обов'язкове поле"),
});