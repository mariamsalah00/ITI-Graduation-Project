import { Box, Typography, TextField, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { categorySchema } from '../../validation/categorySchema';
import { useCategories } from '../../context/CategoriesContext';
import { useNotification } from '../../context/NotificationContext';

export default function CategoryForm() {
  const { t } = useTranslation();
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { categories, addCategory, updateCategory } = useCategories();
  const { notify } = useNotification();

  const isEdit = Boolean(categoryId);
  const existing = isEdit ? categories.find((c) => String(c.id) === String(categoryId)) : null;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: existing || { name: '', description: '' },
    validationSchema: categorySchema,
    onSubmit: (values) => {
      if (isEdit) {
        updateCategory(categoryId, values);
        notify(`${values.name} updated`);
      } else {
        addCategory(values);
        notify(`${values.name} added`);
      }
      navigate('/admin/categories');
    },
  });

  if (isEdit && !existing) {
    return <Typography color="error">Category not found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>{isEdit ? t('admin.editCategory') : t('admin.addCategory')}</Typography>

      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ maxWidth: 480 }}>
        <TextField
          fullWidth label="Category Name" name="name" margin="normal"
          value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth label="Description" name="description" margin="normal" multiline rows={3}
          value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)} helperText={formik.touched.description && formik.errors.description}
        />
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
            {t('common.save')}
          </Button>
          <Button variant="outlined" color="inherit" onClick={() => navigate('/admin/categories')}>
            {t('common.cancel')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
