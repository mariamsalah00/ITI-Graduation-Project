import { Container, Typography, Box, Alert, Divider, Stack } from '@mui/material';
import { FiPackage } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { EmptyState } from '../components/common/EmptyState';

export default function Profile() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [orders] = useLocalStorage('glowcare_orders', []);
  const location = useLocation();

  const myOrders = orders.filter((o) => o.userEmail === currentUser?.email);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {location.state?.justOrdered && (
        <Alert severity="success" sx={{ mb: 4 }}>{t('checkout.successBody')}</Alert>
      )}

      <Typography variant="h4" sx={{ mb: 1 }}>{t('profile.title')}</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>{currentUser?.name} · {currentUser?.email}</Typography>

      <Typography variant="h6" sx={{ mb: 2 }}>{t('profile.orderHistory')}</Typography>

      {myOrders.length === 0 ? (
        <EmptyState icon={<FiPackage />} title={t('profile.noOrders')} />
      ) : (
        <Stack divider={<Divider />} spacing={3}>
          {myOrders.map((order) => (
            <Box key={order.id}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>#{order.id.slice(-8)}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(order.placedAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {order.items.length} item{order.items.length !== 1 ? 's' : ''} · ${order.total.toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Container>
  );
}
