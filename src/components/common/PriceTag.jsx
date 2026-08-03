import { Stack, Typography } from '@mui/material';

export function PriceTag({ price, oldPrice, size = 'body1' }) {
  return (
    <Stack direction="row" spacing={1} alignItems="baseline">
      <Typography variant={size} sx={{ fontWeight: 500 }}>
        ${price.toFixed(2)}
      </Typography>
      {oldPrice ? (
        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
          ${oldPrice.toFixed(2)}
        </Typography>
      ) : null}
    </Stack>
  );
}
