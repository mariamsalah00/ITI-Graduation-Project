import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../context/ProductsContext';
import { ProductCard } from '../components/common/ProductCard';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import homeImg from '/assets/landingpage.png'
export default function Home() {
  const { t } = useTranslation();
  const { products, loading, error, retry } = useProducts();

  const bestsellers = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const newArrivals = [...products].slice(-4).reverse();

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ backgroundImage: `url(${homeImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
   py: { xs: 20, md: 30 } }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 2,color:"var(--color-ink)" }}>
            {t('home.heroTitle')}
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 480, mx: 'auto', mb: 4 }}>
            {t('home.heroSubtitle')}
          </Typography>
          <Button component={Link} to="/shop" variant="contained" color="primary" size="large">
            {t('home.heroCta')}
          </Button>
        </Container>
      </Box>

      {/* Skin quiz banner */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            p: { xs: 3, md: 5 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant="h6">{t('home.quizBanner')}</Typography>
          <Button component={Link} to="/skin-quiz" variant="outlined" color="primary">
            {t('home.quizCta')}
          </Button>
        </Box>
      </Container>

      {/* Bestsellers */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">{t('home.bestsellers')}</Typography>
          <Button component={Link} to="/shop" size="small">
            {t('common.viewAll')}
          </Button>
        </Box>

        {loading && <Loader />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && (
          <Grid container spacing={3}>
            {bestsellers.map((product) => (
              <Grid item xs={6} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* New arrivals */}
      {!loading && !error && (
        <Container maxWidth="lg" sx={{ py: 4, pb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5">{t('home.newArrivals')}</Typography>
            <Button component={Link} to="/shop" size="small">
              {t('common.viewAll')}
            </Button>
          </Box>
          <Grid container spacing={3}>
            {newArrivals.map((product) => (
              <Grid item xs={6} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </Box>
  );
}
