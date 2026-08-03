import { Box, Typography, Grid, Paper } from '@mui/material';
import { FiBox, FiTag } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../../context/ProductsContext';
import { useCategories } from '../../context/CategoriesContext';

const StatCard = ({ icon, label, value }) => (
  <Paper
    elevation={0}
    sx={{ p: 3, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 2 }}
  >
    <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: 'var(--color-surface-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: 'var(--color-accent)' }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 500 }}>{value}</Typography>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Box>
  </Paper>
);

export default function Dashboard() {
  const { t } = useTranslation();
  const { products } = useProducts();
  const { categories } = useCategories();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>{t('admin.dashboard')}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard icon={<FiBox />} label={t('admin.totalProducts')} value={products.length} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard icon={<FiTag />} label={t('admin.totalCategories')} value={categories.length} />
        </Grid>
      </Grid>
    </Box>
  );
}
