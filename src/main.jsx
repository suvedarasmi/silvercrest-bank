import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import '@fontsource-variable/inter';
import bank from './bank-config';
import App from './App';
import './style.css';
import './bank-app.css';

document.title = bank.name + ' | Banking portal';
document.documentElement.dataset.bank = bank.theme;
const theme = createTheme({
  palette: { primary: { main: bank.color }, secondary: { main: '#16336f' }, background: { default: '#f4f7fc', paper: '#ffffff' }, success: { main: '#16815d' }, warning: { main: '#bd7b22' }, error: { main: '#c13d4d' } },
  shape: { borderRadius: 12 },
  typography: { fontFamily: '"Inter Variable", Inter, sans-serif', button: { textTransform: 'none', fontWeight: 680 } },
  components: { MuiButton: { defaultProps: { disableElevation: true } }, MuiCard: { styleOverrides: { root: { borderRadius: 16 } } }, MuiTextField: { defaultProps: { size: 'medium' } } },
});
createRoot(document.getElementById('root')).render(<ThemeProvider theme={theme}><CssBaseline/><App/></ThemeProvider>);
