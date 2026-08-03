import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiGlobe,
  FiSun,
  FiMoon,
  FiX,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
  FiGrid,
} from 'react-icons/fi';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useThemeMode } from '../../../context/ThemeModeContext';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';

const NAV_LINKS = [
  { key: 'shop', to: '/shop' },
  { key: 'about', to: '/about' },
  { key: 'contact', to: '/contact' },
];

export function Header() {
  const { t, i18n } = useTranslation();
  const { totalItems } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { mode, toggleMode } = useThemeMode();
  const { isAuthenticated, isAdmin, currentUser, logout } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [accountAnchor, setAccountAnchor] = useState(null);

  const toggleLanguage = () => i18n.changeLanguage(i18n.resolvedLanguage === 'en' ? 'ar' : 'en');

  const submitSearch = () => {
    const query = searchValue.trim();
    setSearchOpen(false);
    navigate(query ? `/shop?search=${encodeURIComponent(query)}` : '/shop');
  };

  const handleLogout = () => {
    logout();
    setAccountAnchor(null);
    notify('You have been logged out.');
    navigate('/');
  };

  return (
    <>
      {/* Announcement bar — thin, dark, matches the strip above the nav in the screenshots */}
      <Box
        sx={{
          bgcolor: 'var(--color-ink)',
          color: 'var(--color-text-inverse)',
          textAlign: 'center',
          py: 0.75,
          fontSize: '0.75rem',
          letterSpacing: '0.04em',
        }}
      >
        Free shipping on orders over $50
      </Box>

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'var(--color-bg)',
          color: 'var(--color-text-primary)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <Toolbar sx={{ minHeight: 'var(--header-height)', justifyContent: 'space-between', gap: 1 }}>
          {/* Left: nav (desktop) / menu button (mobile) */}
          <Stack direction="row" spacing={4} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' }, flex: 1 }}>
            {NAV_LINKS.map((link) => (
              <Typography
                key={link.key}
                component={NavLink}
                to={link.to}
                sx={{
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: 'inherit',
                  '&.active': { color: 'var(--color-accent)' },
                }}
              >
                {t(`nav.${link.key}`)}
              </Typography>
            ))}
          </Stack>
          <IconButton sx={{ display: { xs: 'inline-flex', md: 'none' } }} onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <FiMenu />
          </IconButton>

          {/* Center: logo */}
          <Typography
            component={Link}
            to="/"
            variant="h5"
            sx={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.2em', color: 'inherit', whiteSpace: 'nowrap' }}
          >
            GLOWCARE
          </Typography>

          {/* Right: actions — only search/account/cart are guaranteed visible on
              the smallest screens; language + theme + wishlist move into the
              mobile drawer at xs so five-plus icons don't get squeezed into a
              320px toolbar. */}
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flex: 1, justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setSearchOpen((v) => !v)} aria-label={searchOpen ? 'Close search' : t('nav.search')}>
              {searchOpen ? <FiX /> : <FiSearch />}
            </IconButton>
            <IconButton onClick={toggleLanguage} aria-label="Toggle language" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
              <FiGlobe />
            </IconButton>
            <IconButton onClick={toggleMode} aria-label="Toggle dark mode" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
              {mode === 'light' ? <FiMoon /> : <FiSun />}
            </IconButton>

            {isAuthenticated ? (
              <>
                <IconButton
                  onClick={(e) => setAccountAnchor(e.currentTarget)}
                  aria-label={t('nav.account')}
                  aria-haspopup="menu"
                  aria-expanded={Boolean(accountAnchor)}
                >
                  <FiUser />
                </IconButton>
                <Menu anchorEl={accountAnchor} open={Boolean(accountAnchor)} onClose={() => setAccountAnchor(null)}>
                  <MenuItem disabled sx={{ opacity: '1 !important', fontSize: '0.8rem', color: 'text.secondary' }}>
                    {currentUser?.name}
                  </MenuItem>
                  <Divider />
                  {isAdmin ? (
                    <MenuItem component={Link} to="/admin" onClick={() => setAccountAnchor(null)}>
                      <ListItemIcon><FiGrid size={16} /></ListItemIcon>
                      Admin Dashboard
                    </MenuItem>
                  ) : (
                    <MenuItem component={Link} to="/profile" onClick={() => setAccountAnchor(null)}>
                      <ListItemIcon><FiUser size={16} /></ListItemIcon>
                      {t('profile.title')}
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon><FiLogOut size={16} /></ListItemIcon>
                    {t('nav.logout')}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton component={Link} to="/login" aria-label={t('nav.login')}>
                <FiUser />
              </IconButton>
            )}

            <IconButton component={Link} to="/wishlist" aria-label={t('nav.wishlist')} sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
              <Badge badgeContent={wishlistCount} color="secondary" showZero={false}>
                <FiHeart />
              </Badge>
            </IconButton>
            <IconButton component={Link} to="/cart" aria-label={t('nav.cart')}>
              <Badge badgeContent={totalItems} color="secondary" showZero={false}>
                <FiShoppingBag />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>

        {/* Expanding search row — full-width, works identically on mobile and desktop
            instead of squeezing an inline field into the toolbar. */}
        {searchOpen && (
          <Box sx={{ borderTop: '1px solid var(--color-border)', py: 1.5 }}>
            <Container maxWidth="lg">
              <TextField
                autoFocus
                fullWidth
                size="small"
                placeholder={t('shop.search')}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><FiSearch /></InputAdornment>,
                }}
              />
            </Container>
          </Box>
        )}
      </AppBar>

      {/* Mobile nav drawer — carries the nav links plus the actions that got
          hidden from the toolbar at xs (language, theme, wishlist), so nothing
          is actually lost on small screens, just relocated. */}
      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <List sx={{ width: 260 }}>
          {NAV_LINKS.map((link) => (
            <ListItemButton key={link.key} component={Link} to={link.to} onClick={() => setMobileOpen(false)}>
              <ListItemText primary={t(`nav.${link.key}`)} />
            </ListItemButton>
          ))}
          <Divider sx={{ my: 1 }} />
          <ListItemButton component={Link} to="/wishlist" onClick={() => setMobileOpen(false)} sx={{ display: { sm: 'none' } }}>
            <ListItemIcon><FiHeart size={18} /></ListItemIcon>
            <ListItemText primary={t('nav.wishlist')} />
          </ListItemButton>
          <ListItemButton onClick={toggleLanguage} sx={{ display: { sm: 'none' } }}>
            <ListItemIcon><FiGlobe size={18} /></ListItemIcon>
            <ListItemText primary="English / العربية" />
          </ListItemButton>
          <ListItemButton onClick={toggleMode} sx={{ display: { sm: 'none' } }}>
            <ListItemIcon>{mode === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}</ListItemIcon>
            <ListItemText primary={mode === 'light' ? 'Dark mode' : 'Light mode'} />
          </ListItemButton>
          <Divider sx={{ my: 1, display: { sm: 'none' } }} />

          {isAuthenticated ? (
            <ListItemButton
              onClick={() => {
                setMobileOpen(false);
                handleLogout();
              }}
            >
              <ListItemIcon><FiLogOut size={18} /></ListItemIcon>
              <ListItemText primary={t('nav.logout')} />
            </ListItemButton>
          ) : (
            <>
              <ListItemButton component={Link} to="/login" onClick={() => setMobileOpen(false)}>
                <ListItemIcon><FiLogIn size={18} /></ListItemIcon>
                <ListItemText primary={t('nav.login')} />
              </ListItemButton>
              <ListItemButton component={Link} to="/register" onClick={() => setMobileOpen(false)}>
                <ListItemIcon><FiUserPlus size={18} /></ListItemIcon>
                <ListItemText primary={t('nav.register')} />
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}
