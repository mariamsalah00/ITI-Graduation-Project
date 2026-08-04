import { Container, Grid, Typography, TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import { contactSchema } from '../validation/contactSchema';
import { useNotification } from '../context/NotificationContext';
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { notify } = useNotification();

  const formik = useFormik({
    initialValues: { name: '', email: '', message: '' },
    validationSchema: contactSchema,
    onSubmit: (values, { resetForm }) => {
      // No backend — simulate a successful send.
      notify(t("contact.success", { name: values.name }));
      resetForm();
    },
  });
  const { t } = useTranslation();

  return (
  <Container maxWidth="md" sx={{ py: 8 }}>
    <Grid container spacing={6}>
      <Grid item xs={12} md={5}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t("contact.title")}
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {t("contact.description")}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {t("contact.email")}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {t("contact.workingHours")}
        </Typography>
      </Grid>

      <Grid item xs={12} md={7}>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            label={t("contact.name")}
            name="name"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            fullWidth
            label={t("contact.emailLabel")}
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
            label={t("contact.message")}
            name="message"
            margin="normal"
            multiline
            rows={4}
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            disabled={formik.isSubmitting}
          >
            {t("contact.send")}
          </Button>
        </Box>
      </Grid>
    </Grid>
  </Container>
);
}
