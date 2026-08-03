import { Container, Typography, Box, Grid, IconButton, Divider, Button, Stack } from '@mui/material';
import { FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { QuantityInput } from '../components/common/QuantityInput';
import { EmptyState } from '../components/common/EmptyState';

export default function Cart() {
  const { t } = useTranslation();
  const { items, updateQty, removeItem, totalPrice } = useCart();
  const navigate = useNavigate();

  const SHIPPING_FEE = 10;
  const isFreeShipping = totalPrice > 50;
  const shippingCost = isFreeShipping ? 0 : SHIPPING_FEE;
  const finalTotal = totalPrice + shippingCost;

  if (items.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <EmptyState
          icon={<FiShoppingBag />}
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
      <Typography variant="h4" sx={{ mb: 4 }}>{t('cart.title')}</Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <Stack divider={<Divider />} spacing={3}>
            {items.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', gap: 2 }}>
                <Box
                  component={Link}
                  to={`/shop/${item.id}`}
                  sx={{ width: 90, height: 90, flexShrink: 0, bgcolor: 'var(--color-surface-alt)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}
                >
                  <Box component="img" src={item.image} alt={item.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography component={Link} to={`/shop/${item.id}`} sx={{ fontWeight: 500, color: 'inherit', textDecoration: 'none' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>${item.price.toFixed(2)}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <QuantityInput value={item.qty} onChange={(qty) => updateQty(item.id, qty)} />
                    <IconButton size="small" onClick={() => removeItem(item.id)} aria-label={t('common.remove')}>
                      <FiTrash2 size={16} />
                    </IconButton>
                  </Box>
                </Box>
                <Typography sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>${(item.price * item.qty).toFixed(2)}</Typography>
              </Box>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>{t('checkout.orderSummary')}</Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">{t('common.subtotal', 'Subtotal')}</Typography>
              <Typography>${totalPrice.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary">{t('common.shipping', 'Shipping')}</Typography>
              <Typography sx={{ color: isFreeShipping ? 'success.main' : 'text.primary', fontWeight: isFreeShipping ? 600 : 400 }}>
                {isFreeShipping ? t('common.free', 'Free') : `$${shippingCost.toFixed(2)}`}
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography sx={{ fontWeight: 500 }}>{t('common.total', 'Total')}</Typography>
              <Typography sx={{ fontWeight: 500 }}>${finalTotal.toFixed(2)}</Typography>
            </Box>

            <Button component={Link} to="/checkout" fullWidth variant="contained" color="primary" size="large">
              {t('cart.checkoutCta')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}