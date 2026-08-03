import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Enter a valid email address.').required('Email is required.'),
  password: Yup.string().required('Password is required.'),
});

export const registerSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Name must be at least 2 characters.').required('Name is required.'),
  email: Yup.string().email('Enter a valid email address.').required('Email is required.'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters.')
    .matches(/[0-9]/, 'Password must include at least one number.')
    .required('Password is required.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match.')
    .required('Confirm your password.'),
});
