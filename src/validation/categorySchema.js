import * as Yup from 'yup';

export const categorySchema = Yup.object({
  name: Yup.string().trim().min(2, 'Name is too short.').required('Category name is required.'),
  description: Yup.string().trim().max(160, 'Keep the description under 160 characters.'),
});
