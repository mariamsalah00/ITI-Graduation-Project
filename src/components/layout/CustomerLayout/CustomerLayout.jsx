import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * Every customer-facing route renders inside here (see routes/index.jsx).
 * min-height: 100vh + flex column is what keeps the footer pinned to the
 * bottom on short pages instead of floating mid-screen.
 */
export function CustomerLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
