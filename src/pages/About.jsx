import { Box, Container, Typography, Grid } from '@mui/material';
import about from '/assets/aboutimg.jfif'
const VALUES = [
  { title: 'Clean formulas', body: 'Every product is formulated without sulfates, parabens, or synthetic fragrance.' },
  { title: 'Dermatologist tested', body: 'Each formula is tested for safety and efficacy before it reaches you.' },
  { title: 'Sustainably sourced', body: 'Ingredients are sourced from partners who share our environmental standards.' },
];

export default function About() {
  return (
    <Box>
      <Box sx={{ backgroundImage: `url(${about})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
         py: { xs: 15, md: 25 }}}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 2 ,color:'var(--color-ink)'}}>Our Story</Typography>
          <Typography color="text.secondary">
            GLOWCARE started with a simple belief: skincare should be effective, honest, and kind to the
            skin you're in. Every formula is built around a handful of proven ingredients, backed by
            research and free of anything that doesn't earn its place in the bottle.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {VALUES.map((value) => (
            <Grid item xs={12} md={4} key={value.title}>
              <Typography variant="h6" sx={{ mb: 1 }}>{value.title}</Typography>
              <Typography color="text.secondary">{value.body}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
