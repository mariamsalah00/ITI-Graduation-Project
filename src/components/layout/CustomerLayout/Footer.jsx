import { Box, Container, Grid, Typography, Stack, IconButton } from '@mui/material';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const COLUMNS = [
  { title: 'Shop', links: ['All Products', 'Skin Care', 'Best Sellers', 'New Arrivals'] },
  { title: 'Help', links: ['Contact', 'Shipping', 'Returns', 'FAQ'] },
  { title: 'Company', links: ['About', 'Journal', 'Stores'] },
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <Box component="footer" sx={{ bgcolor: 'var(--color-ink)', color: 'var(--color-text-inverse)', borderTop: '1px solid rgba(244,239,231,0.08)', mt: 'auto' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.2em', mb: 2 }}>
              GLOWCARE
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ color: 'inherit' }} aria-label="Instagram">
                <FiInstagram />
              </IconButton>
              <IconButton size="small" sx={{ color: 'inherit' }} aria-label="Facebook">
                <FiFacebook />
              </IconButton>
              <IconButton size="small" sx={{ color: 'inherit' }} aria-label="Twitter">
                <FiTwitter />
              </IconButton>
            </Stack>
          </Grid>

          {COLUMNS.map((col) => (
            <Grid item xs={6} md={3} key={col.title}>
              <Typography sx={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', mb: 2, opacity: 0.7 }}>
                {col.title}
              </Typography>
              <Stack spacing={1}>
                {col.links.map((label) => (
                  <Typography key={label} component={Link} to="#" sx={{ fontSize: '0.85rem', color: 'inherit', opacity: 0.85 }}>
                    {label}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ borderTop: '1px solid rgba(244,239,231,0.15)', mt: 6, pt: 3 }}>
          <Typography sx={{ fontSize: '0.75rem', opacity: 0.6 }}>
            © {new Date().getFullYear()} GLOWCARE. {t('footer.rights')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
