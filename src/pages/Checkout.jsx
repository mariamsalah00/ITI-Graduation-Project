import { Container, Typography, Grid, TextField, Box, Button, Divider } from '@mui/material';
import { FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { checkoutSchema } from '../validation/checkoutSchema';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { EmptyState } from '../components/common/EmptyState';

export default function Checkout() {
  const { t } = useTranslation();
  const { items, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [orders, setOrders] = useLocalStorage('glowcare_orders', []);
  const navigate = useNavigate();

  const SHIPPING_FEE = 10; 
  const isFreeShipping = totalPrice > 50;
  const shippingCost = isFreeShipping ? 0 : SHIPPING_FEE;
  const finalTotal = totalPrice + shippingCost;

  const formik = useFormik({
    initialValues: { fullName: '', address: '', city: '', postalCode: '', phone: '', cardNumber: '', cardExpiry: '', cardCvc: '' },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      const order = {
        id: `ord_${Date.now()}`,
        userEmail: currentUser?.email,
        items,
        subtotal: totalPrice,
        shippingFee: shippingCost,
        total: finalTotal, 
        placedAt: new Date().toISOString(),
        shipTo: { fullName: values.fullName, address: values.address, city: values.city },
      };
      setOrders([order, ...orders]);
      clearCart();
      navigate('/profile', { state: { justOrdered: true } });
    },
  });

  if (items.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <EmptyState
          icon={<FiCheckCircle />}
          title={t('cart.emptyTitle')}
          description={t('cart.emptyBody')}
          actionLabel={t('cart.emptyCta')}
          onAction={() => navigate('/shop')}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>{t('checkout.title')}</Typography>

      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <Typography variant="h6" sx={{ mb: 2 }}>{t('checkout.shippingDetails')}</Typography>
            {[
              ['fullName', 'Full Name'],
              ['address', 'Address'],
              ['city', 'City'],
              ['postalCode', 'Postal Code'],
              ['phone', 'Phone'],
            ].map(([name, label]) => (
              <TextField
                key={name}
                fullWidth
                label={label}
                name={name}
                margin="normal"
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                helperText={formik.touched[name] && formik.errors[name]}
              />
            ))}

            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>{t('checkout.paymentDetails')}</Typography>
            <TextField
              fullWidth label="Card Number" name="cardNumber" margin="normal" placeholder="4242424242424242"
              value={formik.values.cardNumber} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Expiry (MM/YY)" name="cardExpiry" margin="normal" placeholder="08/28"
                value={formik.values.cardExpiry} onChange={formik.handleChange} onBlur={formik.handleBlur}
                error={formik.touched.cardExpiry && Boolean(formik.errors.cardExpiry)}
                helperText={formik.touched.cardExpiry && formik.errors.cardExpiry}
              />
              <TextField
                label="CVC" name="cardCvc" margin="normal" placeholder="123"
                value={formik.values.cardCvc} onChange={formik.handleChange} onBlur={formik.handleBlur}
                error={formik.touched.cardCvc && Boolean(formik.errors.cardCvc)}
                helperText={formik.touched.cardCvc && formik.errors.cardCvc}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', p: 3, position: { md: 'sticky' }, top: { md: 96 } }}>
              <Typography variant="h6" sx={{ mb: 2 }}>{t('checkout.orderSummary')}</Typography>
              {items.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">{item.name} × {item.qty}</Typography>
                  <Typography variant="body2">${(item.price * item.qty).toFixed(2)}</Typography>
                </Box>
              ))}
              
              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">{t('checkout.subtotal', 'Subtotal')}</Typography>
                <Typography variant="body2">${totalPrice.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">{t('checkout.shipping', 'Shipping')}</Typography>
                <Typography variant="body2" sx={{ color: isFreeShipping ? 'success.main' : 'text.primary', fontWeight: isFreeShipping ? 600 : 400 }}>
                  {isFreeShipping ? t('checkout.free', 'FREE') : `$${shippingCost.toFixed(2)}`}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography sx={{ fontWeight: 600 }}>{t('common.total')}</Typography>
                <Typography sx={{ fontWeight: 600 }}>${finalTotal.toFixed(2)}</Typography>
              </Box>

              <Button type="submit" fullWidth variant="contained" color="primary" size="large" disabled={formik.isSubmitting}>
                {t('checkout.placeOrder')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}