import { Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/common/ProductCard';
import { EmptyState } from '../components/common/EmptyState';

export default function Wishlist() {
  const { t } = useTranslation();
  const { items } = useWishlist();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>{t('wishlist.title')}</Typography>

      {items.length === 0 ? (
        <EmptyState
          icon={<FiHeart />}
          title={t('wishlist.emptyTitle')}
          description={t('wishlist.emptyBody')}
          actionLabel={t('wishlist.emptyCta')}
          onAction={() => navigate('/shop')}
        />
      ) : (
        <Grid container spacing={3}>
          {items.map((product) => (
            <Grid item xs={6} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
