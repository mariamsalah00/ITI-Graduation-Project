import { Box, Card, CardContent, IconButton, Typography, Button } from '@mui/material';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNotification } from '../../context/NotificationContext';
import { PriceTag } from './PriceTag';
import { StarRating } from './StarRating';

export function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { notify } = useNotification();
  const inWishlist = isInWishlist(product.id);
  const outOfStock = product.stock <= 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product, 1);
    notify(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleItem(product);
    notify(inWishlist ? `Removed from wishlist` : `Added to wishlist`);
  };

  return (
    <Card
      component={Link}
      to={`/shop/${product.id}`}
      elevation={0}
      sx={{
        display: 'block',
        textDecoration: 'none',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'box-shadow 0.2s ease',
        '&:hover': { boxShadow: 'var(--shadow-card)' },
      }}
    >
      <Box sx={{ position: 'relative', aspectRatio: '1 / 1', bgcolor: 'var(--color-surface-alt)' }}>
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          loading="lazy"
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <IconButton
          onClick={handleToggleWishlist}
          size="small"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          sx={{
            position: 'absolute',
            top: 8,
            insetInlineEnd: 8,
            bgcolor: 'var(--color-surface)',
            '&:hover': { bgcolor: 'var(--color-surface)' },
          }}
        >
          <FiHeart color={inWishlist ? 'var(--color-error)' : 'var(--color-text-primary)'} fill={inWishlist ? 'var(--color-error)' : 'none'} />
        </IconButton>
        {outOfStock && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              insetInlineStart: 8,
              bgcolor: 'var(--color-ink)',
              color: 'var(--color-text-inverse)',
              fontSize: '0.7rem',
              px: 1,
              py: 0.25,
              borderRadius: 'var(--radius-sm)',
            }}
          >
            Out of stock
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {product.category}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, lineHeight: 1.3, mt: 0.5, mb: 0.5 }} noWrap>
          {product.name}
        </Typography>
        <StarRating value={product.rating} />
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
          <PriceTag price={product.price} oldPrice={product.oldPrice} />
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            disabled={outOfStock}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
