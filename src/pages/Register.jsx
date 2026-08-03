import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert, Link as MuiLink } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { registerSchema } from '../validation/authSchemas';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export default function Register() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState('');

  const from = location.state?.from?.pathname || '/';

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema: registerSchema,
    onSubmit: (values, { setSubmitting }) => {
      setFormError('');
      const result = register(values);
      if (!result.success) {
        setFormError(result.error);
        setSubmitting(false);
        return;
      }
      notify(`Welcome to GLOWCARE, ${result.user.name}!`);
      navigate(from, { replace: true });
    },
  });

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h4" sx={{ mb: 1, textAlign: 'center' }}>{t('auth.registerTitle')}</Typography>
      <Typography color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
        {t('auth.registerSubtitle')}{' '}
        <MuiLink component={Link} to="/login" state={{ from: location.state?.from }}>{t('auth.loginLink')}</MuiLink>
      </Typography>

      {formError && <Alert severity="error" sx={{ mb: 3 }}>{formError}</Alert>}

      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <TextField
          fullWidth label={t('auth.name')} name="name" margin="normal"
          value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth label={t('auth.email')} name="email" margin="normal"
          value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth label={t('auth.password')} name="password" type="password" margin="normal"
          value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          fullWidth label={t('auth.confirmPassword')} name="confirmPassword" type="password" margin="normal"
          value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" size="large" sx={{ mt: 3 }} disabled={formik.isSubmitting}>
          {t('auth.registerCta')}
        </Button>
      </Box>
    </Container>
  );
}
