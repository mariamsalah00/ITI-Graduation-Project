import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import { FiLogOut, FiExternalLink, FiSun, FiMoon, FiMenu } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useThemeMode } from '../../../context/ThemeModeContext';
import { useNotification } from '../../../context/NotificationContext';
import { ADMIN_DRAWER_WIDTH } from './Sidebar';

export function Topbar({ onMenuClick }) {
  const { currentUser, logout } = useAuth();
  const { mode, toggleMode } = useThemeMode();
  const { notify } = useNotification();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    notify('You have been logged out.');
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'var(--color-surface)',
        color: 'var(--color-text-primary)',
        borderBottom: '1px solid var(--color-border)',
        ml: { md: `${ADMIN_DRAWER_WIDTH}px` },
        width: { md: `calc(100% - ${ADMIN_DRAWER_WIDTH}px)` },
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          <IconButton onClick={onMenuClick} size="small" aria-label="Open admin menu" sx={{ display: { xs: 'inline-flex', md: 'none' } }}>
            <FiMenu />
          </IconButton>
          <Typography variant="body2" color="text.secondary" noWrap sx={{ display: { xs: 'none', sm: 'block' } }}>
            Signed in as <strong>{currentUser?.name}</strong>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexShrink: 0 }}>
          <IconButton onClick={toggleMode} size="small" aria-label="Toggle dark mode">
            {mode === 'light' ? <FiMoon /> : <FiSun />}
          </IconButton>
          <Button component={Link} to="/" size="small" startIcon={<FiExternalLink />} sx={{ minWidth: 0, px: { xs: 1, sm: 2 } }}>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>View store</Box>
          </Button>
          <Button onClick={handleLogout} size="small" startIcon={<FiLogOut />} sx={{ minWidth: 0, px: { xs: 1, sm: 2 } }}>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Log out</Box>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
