import { Box, Typography, Button } from '@mui/material';

/**
 * One shared shape for every empty state in the app: icon, a plain
 * statement of what's missing, and — where there's a next action —
 * a single button to take it. Keeps "nothing here yet" from reading
 * differently on every page.
 */
export function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <Box sx={{ textAlign: 'center', py: { xs: 6, md: 10 }, px: 2 }}>
      {icon && (
        <Box sx={{ fontSize: 40, color: 'var(--color-accent)', mb: 2, display: 'flex', justifyContent: 'center' }}>
          {icon}
        </Box>
      )}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography color="text.secondary" sx={{ maxWidth: 420, mx: 'auto', mb: actionLabel ? 3 : 0 }}>
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button variant="contained" color="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
