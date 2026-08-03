import { useMemo, useState } from 'react';
import { Container, Typography, Box, Grid, Button, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../context/ProductsContext';
import { ProductCard } from '../components/common/ProductCard';
import { EmptyState } from '../components/common/EmptyState';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';

const SKIN_TYPES = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'];
const SKIN_CONCERNS = ['Dullness', 'Fine Lines', 'Dehydration', 'Congestion', 'Redness', 'Uneven Texture'];

export default function SkinQuiz() {
  const { t } = useTranslation();
  const { products, loading, error, retry } = useProducts();
  const [step, setStep] = useState(0); // 0: skin type, 1: concern, 2: results
  const [skinType, setSkinType] = useState(null);
  const [skinConcern, setSkinConcern] = useState(null);

  const results = useMemo(() => {
    if (!skinType || !skinConcern) return [];
    return products.filter((p) => p.skinType.includes(skinType) && p.skinConcern.includes(skinConcern));
  }, [products, skinType, skinConcern]);

  const restart = () => {
    setStep(0);
    setSkinType(null);
    setSkinConcern(null);
  };

  if (loading) return <Loader minHeight={480} />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 1, textAlign: 'center' }}>{t('quiz.title')}</Typography>
      <Typography color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>{t('quiz.subtitle')}</Typography>

      {step < 2 && <LinearProgress variant="determinate" value={(step / 2) * 100} sx={{ mb: 5, height: 4, borderRadius: 2 }} />}

      {step === 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>{t('quiz.skinTypeQuestion')}</Typography>
          <Grid container spacing={2} justifyContent="center">
            {SKIN_TYPES.map((option) => (
              <Grid item key={option}>
                <Button
                  variant={skinType === option ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => { setSkinType(option); setStep(1); }}
                >
                  {option}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {step === 1 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>{t('quiz.skinConcernQuestion')}</Typography>
          <Grid container spacing={2} justifyContent="center">
            {SKIN_CONCERNS.map((option) => (
              <Grid item key={option}>
                <Button
                  variant={skinConcern === option ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => setSkinConcern(option)}
                >
                  {option}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button onClick={() => setStep(0)} size="small" color="inherit">{t('common.back')}</Button>
            <Button onClick={() => setStep(2)} variant="contained" color="primary" disabled={!skinConcern}>
              {t('quiz.seeResults')}
            </Button>
          </Box>
        </Box>
      )}

      {step === 2 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>{t('quiz.resultsTitle')}</Typography>
          {results.length === 0 ? (
            <EmptyState
              title={t('shop.noResultsTitle')}
              description="Try a different combination of skin type and concern."
              actionLabel={t('quiz.restart')}
              onAction={restart}
            />
          ) : (
            <>
              <Grid container spacing={3}>
                {results.map((product) => (
                  <Grid item xs={6} sm={6} md={4} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button onClick={restart} variant="outlined">{t('quiz.restart')}</Button>
              </Box>
            </>
          )}
        </Box>
      )}
    </Container>
  );
}
