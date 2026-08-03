import * as Yup from 'yup';

export const productSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Name is too short.').required('Product name is required.'),
  brand: Yup.string().trim().required('Brand is required.'),
  category: Yup.string().required('Category is required.'),
  description: Yup.string().trim().min(10, 'Description should be at least 10 characters.').required('Description is required.'),
  price: Yup.number().typeError('Price must be a number.').positive('Price must be greater than 0.').required('Price is required.'),
  oldPrice: Yup.number()
    .typeError('Old price must be a number.')
    .nullable()
    .transform((value, original) => (original === '' ? null : value))
    .test('is-greater', 'Old price should be higher than the current price.', function (value) {
      const { price } = this.parent;
      return value == null || value > price;
    }),
  image: Yup.string().trim().required('Image URL is required.'),
  stock: Yup.number().typeError('Stock must be a number.').integer('Stock must be a whole number.').min(0, 'Stock cannot be negative.').required('Stock is required.'),
  skinType: Yup.array().min(1, 'Select at least one skin type.'),
  skinConcern: Yup.array().min(1, 'Select at least one skin concern.'),
});
