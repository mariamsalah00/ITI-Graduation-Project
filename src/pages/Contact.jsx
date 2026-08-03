import { Container, Grid, Typography, TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import { contactSchema } from '../validation/contactSchema';
import { useNotification } from '../context/NotificationContext';

export default function Contact() {
  const { notify } = useNotification();

  const formik = useFormik({
    initialValues: { name: '', email: '', message: '' },
    validationSchema: contactSchema,
    onSubmit: (values, { resetForm }) => {
      // No backend — simulate a successful send.
      notify(`Thanks, ${values.name}! We'll get back to you soon.`);
      resetForm();
    },
  });

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <Typography variant="h4" sx={{ mb: 2 }}>Get in Touch</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Questions about a product or your order? Send us a message and we'll respond within one business day.
          </Typography>
          <Typography variant="body2" color="text.secondary">hello@glowcare.com</Typography>
          <Typography variant="body2" color="text.secondary">Mon–Fri, 9am–5pm</Typography>
        </Grid>

        <Grid item xs={12} md={7}>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Name"
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
              label="Email"
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
              label="Message"
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
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }} disabled={formik.isSubmitting}>
              Send Message
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
