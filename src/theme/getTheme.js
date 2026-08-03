import { createTheme } from '@mui/material/styles';

/**
 * Reads a CSS custom property from :root (or the current [data-theme] scope)
 * so the MUI theme and the plain-CSS parts of the app (Bootstrap utilities,
 * hand-written component CSS) always agree on the same values. This is the
 * single place that translates design tokens into a Material UI theme —
 * once real Figma values land in variables.css, this file needs no changes.
 */
const cssVar = (name, fallback) => {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
};

export const getTheme = (mode = 'light') => {
  document.documentElement.setAttribute('data-theme', mode);

  return createTheme({
    palette: {
      mode,
      background: {
        default: cssVar('--color-bg', '#f4efe7'),
        paper: cssVar('--color-surface', '#fbf9f5'),
      },
      text: {
        primary: cssVar('--color-text-primary', '#241f1a'),
        secondary: cssVar('--color-text-secondary', '#6f6559'),
      },
      primary: {
        main: cssVar('--color-cta', '#1a1714'),
        contrastText: cssVar('--color-text-inverse', '#f4efe7'),
      },
      secondary: {
        main: cssVar('--color-accent', '#a9967c'),
        contrastText: cssVar('--color-text-primary', '#241f1a'),
      },
      error: { main: cssVar('--color-error', '#a3403a') },
      warning: { main: cssVar('--color-warning', '#b9863f') },
      success: { main: cssVar('--color-success', '#4f7a5b') },
      info: { main: cssVar('--color-info', '#5b7286') },
      divider: cssVar('--color-border', '#e2d9c8'),
    },
    shape: {
      borderRadius: 2, // hairline, squared-off cards per the screenshots
    },
    typography: {
      fontFamily: cssVar('--font-body', "'Work Sans', 'Inter', sans-serif"),
      h1: { fontFamily: cssVar('--font-heading', "'Jost', sans-serif"), fontWeight: 500, letterSpacing: '0.02em' },
      h2: { fontFamily: cssVar('--font-heading', "'Jost', sans-serif"), fontWeight: 500, letterSpacing: '0.02em' },
      h3: { fontFamily: cssVar('--font-heading', "'Jost', sans-serif"), fontWeight: 500, letterSpacing: '0.01em' },
      h4: { fontFamily: cssVar('--font-heading', "'Jost', sans-serif"), fontWeight: 500 },
      h5: { fontFamily: cssVar('--font-heading', "'Jost', sans-serif"), fontWeight: 500 },
      h6: { fontFamily: cssVar('--font-heading', "'Jost', sans-serif"), fontWeight: 500 },
      button: { textTransform: 'none', fontWeight: 500, letterSpacing: '0.03em' },
    },
    spacing: 4, // 4px base — matches --space-* scale in variables.css
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 2, paddingInline: 24, paddingBlock: 12 },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined', size: 'medium' },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' }, // avoid MUI's elevation-tint overlay clashing with flat design
        },
      },
    },
  });
};
