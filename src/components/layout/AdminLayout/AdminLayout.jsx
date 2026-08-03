import { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

/**
 * Every admin route (already wrapped by AdminRoute for auth) renders here.
 * Sidebar renders as a permanent Drawer on md+ and a temporary/overlay one
 * on mobile — this component owns the open/close state for the mobile
 * variant and hands it to both children (Topbar triggers it, Sidebar shows it).
 */
export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'var(--color-bg)' }}>
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <Box component="main" sx={{ p: { xs: 2, md: 4 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
