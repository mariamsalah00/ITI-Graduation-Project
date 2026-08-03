import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Chip, Stack, Button, Divider } from '@mui/material';
import { FiHeart } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import { StarRating } from '../components/common/StarRating';
import { PriceTag } from '../components/common/PriceTag';
import { QuantityInput } from '../components/common/QuantityInput';
import { ProductCard } from '../components/common/ProductCard';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';

export default function ProductDetails() {
  const { t } = useTranslation();
  const { productId } = useParams();
  const { products, loading, error, retry, getById } = useProducts();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { notify } = useNotification();
  const [qty, setQty] = useState(1);

  if (loading) return <Loader minHeight={480} />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  const product = getById(productId);

  if (!product) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <EmptyState
          title="Product not found"
          description="This product may have been removed or the link is incorrect."
          actionLabel="Back to Shop"
          onAction={() => {}}
        />
        <Box sx={{ textAlign: 'center' }}>
          <Button component={Link} to="/shop" variant="contained">
            Back to Shop
          </Button>
        </Box>
      </Container>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const inWishlist = isInWishlist(product.id);
  const outOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addItem(product, qty);
    notify(`${product.name} added to cart`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', bgcolor: 'var(--color-surface-alt)', borderRadius: 'var(--radius-md)' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.brand} · {product.category}
          </Typography>
          <Typography variant="h4" sx={{ mt: 1, mb: 1.5 }}>{product.name}</Typography>
          <StarRating value={product.rating} />
          <Box sx={{ my: 2.5 }}>
            <PriceTag price={product.price} oldPrice={product.oldPrice} size="h5" />
          </Box>
          <Typography color="text.secondary" sx={{ mb: 3 }}>{product.description}</Typography>

          {outOfStock ? (
            <Chip label={t('common.outOfStock')} color="error" variant="outlined" sx={{ mb: 3 }} />
          ) : (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <QuantityInput value={qty} onChange={setQty} max={product.stock} />
              <Typography variant="caption" color="text.secondary">{product.stock} in stock</Typography>
            </Stack>
          )}

          <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
            <Button variant="contained" color="primary" size="large" onClick={handleAddToCart} disabled={outOfStock} sx={{ flex: 1 }}>
              {t('common.addToCart')}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => { toggleItem(product); notify(inWishlist ? 'Removed from wishlist' : 'Added to wishlist'); }}
              startIcon={<FiHeart fill={inWishlist ? 'var(--color-error)' : 'none'} color={inWishlist ? 'var(--color-error)' : 'currentColor'} />}
            >
              {inWishlist ? 'Saved' : 'Save'}
            </Button>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="subtitle2" sx={{ mb: 1 }}>{t('product.skinType')}</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2, rowGap: 1 }}>
            {product.skinType.map((s) => <Chip key={s} label={s} size="small" variant="outlined" />)}
          </Stack>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>{t('product.skinConcern')}</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2, rowGap: 1 }}>
            {product.skinConcern.map((s) => <Chip key={s} label={s} size="small" variant="outlined" />)}
          </Stack>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>{t('product.ingredients')}</Typography>
          <Typography variant="body2" color="text.secondary">{product.ingredients.join(', ')}</Typography>
        </Grid>
      </Grid>

      {related.length > 0 && (
        <Box sx={{ mt: 10 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>{t('product.relatedTitle')}</Typography>
          <Grid container spacing={3}>
            {related.map((p) => (
              <Grid item xs={6} sm={6} md={3} key={p.id}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
