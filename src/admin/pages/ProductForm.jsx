import { Box, Typography, TextField, Button, Grid, MenuItem, FormControl, InputLabel, Select, OutlinedInput, Chip, FormHelperText } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { productSchema } from '../../validation/productSchema';
import { useProducts } from '../../context/ProductsContext';
import { useCategories } from '../../context/CategoriesContext';
import { useNotification } from '../../context/NotificationContext';

const SKIN_TYPES = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive', 'All'];
const SKIN_CONCERNS = ['Dullness', 'Fine Lines', 'Dehydration', 'Congestion', 'Redness', 'Uneven Texture', 'Hyperpigmentation', 'Excess Oil', 'Large Pores', 'Sensitivity', 'Sun Protection', 'Puffiness'];

const EMPTY_PRODUCT = {
  name: '', brand: '', category: '', description: '', price: '', oldPrice: '', image: '', stock: '',
  skinType: [], skinConcern: [], ingredients: [], rating: 0,
};

export default function ProductForm() {
  const { t } = useTranslation();
  const { productId } = useParams();
  const navigate = useNavigate();
  const { getById, addProduct, updateProduct } = useProducts();
  const { categories } = useCategories();
  const { notify } = useNotification();

  const isEdit = Boolean(productId);
  const existing = isEdit ? getById(productId) : null;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: existing
      ? { ...existing, ingredients: existing.ingredients?.join(', ') || '' }
      : EMPTY_PRODUCT,
    validationSchema: productSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
        price: Number(values.price),
        oldPrice: values.oldPrice === '' ? null : Number(values.oldPrice),
        stock: Number(values.stock),
        ingredients: typeof values.ingredients === 'string'
          ? values.ingredients.split(',').map((s) => s.trim()).filter(Boolean)
          : values.ingredients,
      };

      if (isEdit) {
        updateProduct(productId, payload);
        notify(`${payload.name} updated`);
      } else {
        addProduct(payload);
        notify(`${payload.name} added`);
      }
      navigate('/admin/products');
    },
  });

  if (isEdit && !existing) {
    return <Typography color="error">Product not found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>{isEdit ? t('admin.editProduct') : t('admin.addProduct')}</Typography>

      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ maxWidth: 720 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="Product Name" name="name"
              value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="Brand" name="brand"
              value={formik.values.brand} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.brand && Boolean(formik.errors.brand)} helperText={formik.touched.brand && formik.errors.brand}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={formik.touched.category && Boolean(formik.errors.category)}>
              <InputLabel>Category</InputLabel>
              <Select label="Category" name="category" value={formik.values.category} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                {categories.map((c) => <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>)}
              </Select>
              {formik.touched.category && formik.errors.category && <FormHelperText>{formik.errors.category}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="Image URL" name="image"
              value={formik.values.image} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.image && Boolean(formik.errors.image)} helperText={formik.touched.image && formik.errors.image}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth multiline rows={3} label="Description" name="description"
              value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)} helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth label="Price" name="price" type="number"
              value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)} helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth label="Old Price" name="oldPrice" type="number"
              value={formik.values.oldPrice ?? ''} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.oldPrice && Boolean(formik.errors.oldPrice)} helperText={formik.touched.oldPrice && formik.errors.oldPrice}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="Stock" name="stock" type="number"
              value={formik.values.stock} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.stock && Boolean(formik.errors.stock)} helperText={formik.touched.stock && formik.errors.stock}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={formik.touched.skinType && Boolean(formik.errors.skinType)}>
              <InputLabel>Skin Type</InputLabel>
              <Select
                multiple label="Skin Type" name="skinType" value={formik.values.skinType}
                onChange={(e) => formik.setFieldValue('skinType', e.target.value)}
                input={<OutlinedInput label="Skin Type" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {selected.map((v) => <Chip key={v} label={v} size="small" />)}
                  </Box>
                )}
              >
                {SKIN_TYPES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
              {formik.touched.skinType && formik.errors.skinType && <FormHelperText>{formik.errors.skinType}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={formik.touched.skinConcern && Boolean(formik.errors.skinConcern)}>
              <InputLabel>Skin Concern</InputLabel>
              <Select
                multiple label="Skin Concern" name="skinConcern" value={formik.values.skinConcern}
                onChange={(e) => formik.setFieldValue('skinConcern', e.target.value)}
                input={<OutlinedInput label="Skin Concern" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {selected.map((v) => <Chip key={v} label={v} size="small" />)}
                  </Box>
                )}
              >
                {SKIN_CONCERNS.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
              {formik.touched.skinConcern && formik.errors.skinConcern && <FormHelperText>{formik.errors.skinConcern}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="Ingredients (comma-separated)" name="ingredients"
              value={formik.values.ingredients} onChange={formik.handleChange} onBlur={formik.handleBlur}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
            {t('common.save')}
          </Button>
          <Button variant="outlined" color="inherit" onClick={() => navigate('/admin/products')}>
            {t('common.cancel')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
