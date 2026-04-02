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
    .email('Invalid email')
    .required("Email is required"),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required("Confirm Password is required"),
});