import { Box, IconButton, Typography } from '@mui/material';
import { FiMinus, FiPlus } from 'react-icons/fi';

export function QuantityInput({ value, onChange, min = 1, max = 99 }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
      }}
    >
      <IconButton size="small" onClick={dec} disabled={value <= min} aria-label="Decrease quantity">
        <FiMinus size={14} />
      </IconButton>
      <Typography sx={{ width: 32, textAlign: 'center', fontSize: '0.9rem' }} aria-live="polite">
        {value}
      </Typography>
      <IconButton size="small" onClick={inc} disabled={value >= max} aria-label="Increase quantity">
        <FiPlus size={14} />
      </IconButton>
    </Box>
  );
}
