import * as Yup from 'yup';

export const contactSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Enter your name.').required('Name is required.'),
  email: Yup.string().email('Enter a valid email address.').required('Email is required.'),
  message: Yup.string().trim().min(10, 'Message should be at least 10 characters.').required('Message is required.'),
});
