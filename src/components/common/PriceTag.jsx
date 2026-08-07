import { Stack, Typography } from "@mui/material";
/**
 * @param {{price: number, oldPrice?: number|null, size?: string}} props
 *   `size` is any MUI Typography `variant` (e.g. 'body1', 'h5').
 */
export function PriceTag({ price, oldPrice, size = "body1" }) {
  return (
    <Stack direction="row" spacing={1} alignItems="baseline">
      <Typography variant={size} sx={{ fontWeight: 500 }}>
        ${price.toFixed(2)}
      </Typography>
      {oldPrice ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textDecoration: "line-through" }}
        >
          ${oldPrice.toFixed(2)}
        </Typography>
      ) : null}
    </Stack>
  );
}
