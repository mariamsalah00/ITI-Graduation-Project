import { Drawer, Toolbar, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { FiGrid, FiBox, FiTag } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const DRAWER_WIDTH = 240;

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/admin', icon: <FiGrid />, end: true },
  { label: 'Products', to: '/admin/products', icon: <FiBox /> },
  { label: 'Categories', to: '/admin/categories', icon: <FiTag /> },
];

const navContent = (onNavigate) => (
  <>
    <Toolbar>
      <Typography sx={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.15em' }}>GLOWCARE ADMIN</Typography>
    </Toolbar>
    <List sx={{ px: 1 }}>
      {NAV_ITEMS.map((item) => (
        <ListItemButton
          key={item.to}
          component={NavLink}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          sx={{
            borderRadius: 1,
            mb: 0.5,
            color: 'inherit',
            opacity: 0.75,
            '&.active': { opacity: 1, bgcolor: 'rgba(244,239,231,0.08)' },
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  </>
);

const paperSx = {
  width: DRAWER_WIDTH,
  boxSizing: 'border-box',
  bgcolor: 'var(--color-ink)',
  color: 'var(--color-text-inverse)',
  border: 'none',
};

/**
 * Two Drawer variants sharing the same nav content: a permanent one for
 * md+ (was the only variant before — meant admin nav was completely
 * unreachable on mobile, a real responsive bug) and a temporary/overlay
 * one for xs-sm, opened via the hamburger button Topbar now renders.
 */
export function Sidebar({ mobileOpen, onMobileClose }) {
  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': paperSx }}
      >
        {navContent(onMobileClose)}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': paperSx,
        }}
      >
        {navContent()}
      </Drawer>
    </>
  );
}

export const ADMIN_DRAWER_WIDTH = DRAWER_WIDTH;
