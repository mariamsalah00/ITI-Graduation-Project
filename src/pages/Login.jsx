import { useState } from 'react';
import { Box, Container, Grid, Typography, TextField, Button, Alert, Link as MuiLink } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { loginSchema } from '../validation/authSchemas';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState('');

  const from = location.state?.from?.pathname || '/';

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting }) => {
      setFormError('');
      const result = login(values);
      if (!result.success) {
        setFormError(result.error);
        setSubmitting(false);
        return;
      }
      notify(`Welcome back, ${result.user.name}!`);
      navigate(result.user.role === 'admin' ? '/admin' : from, { replace: true });
    },
  });

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h4" sx={{ mb: 1, textAlign: 'center' }}>{t('auth.loginTitle')}</Typography>
      <Typography color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
        {t('auth.loginSubtitle')}{' '}
        <MuiLink component={Link} to="/register" state={{ from: location.state?.from }}>{t('auth.registerLink')}</MuiLink>
      </Typography>

      {formError && <Alert severity="error" sx={{ mb: 3 }}>{formError}</Alert>}

      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <TextField
          fullWidth
          label={t('auth.email')}
          name="email"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          label={t('auth.password')}
          name="password"
          type="password"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" size="large" sx={{ mt: 3 }} disabled={formik.isSubmitting}>
          {t('auth.loginCta')}
        </Button>
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 3 }}>
        {t('auth.adminHint')}
      </Typography>
    </Container>
  );
}
