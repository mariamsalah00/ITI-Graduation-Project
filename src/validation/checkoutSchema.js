import * as Yup from 'yup';

export const checkoutSchema = Yup.object({
  fullName: Yup.string().trim().min(2, 'Enter your full name.').required('Full name is required.'),
  address: Yup.string().trim().min(5, 'Enter a complete address.').required('Address is required.'),
  city: Yup.string().trim().required('City is required.'),
  postalCode: Yup.string().trim().required('Postal code is required.'),
  phone: Yup.string()
    .trim()
    .matches(/^[0-9+\s-]{7,}$/, 'Enter a valid phone number.')
    .required('Phone number is required.'),
  cardNumber: Yup.string()
    .trim()
    .matches(/^[0-9]{13,19}$/, 'Enter a valid card number.')
    .required('Card number is required.'),
  cardExpiry: Yup.string()
    .trim()
    .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'Use MM/YY format.')
    .required('Expiry date is required.'),
  cardCvc: Yup.string()
    .trim()
    .matches(/^[0-9]{3,4}$/, 'Enter a valid CVC.')
    .required('CVC is required.'),
});
