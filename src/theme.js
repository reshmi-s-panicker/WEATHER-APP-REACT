import { createTheme } from '@mui/material/styles';

// Dusk-sky palette: deep navy night sky, amber sunrise accent, teal dawn accent
const colors = {
  night: '#0B1220',
  surface: '#121B2E',
  surfaceRaised: '#182339',
  amber: '#F5A623',
  teal: '#4FD1C5',
  text: '#E8EDF5',
  muted: '#8A93A6',
  danger: '#F16C6C',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: colors.night,
      paper: colors.surface,
    },
    primary: {
      main: colors.amber,
      contrastText: colors.night,
    },
    secondary: {
      main: colors.teal,
      contrastText: colors.night,
    },
    error: {
      main: colors.danger,
    },
    text: {
      primary: colors.text,
      secondary: colors.muted,
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});

export { colors };
export default theme;
