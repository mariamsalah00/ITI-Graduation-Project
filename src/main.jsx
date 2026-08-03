import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Import order matters — see the header comment in styles/global.css
import './styles/variables.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './styles/global.css';
import './i18n/index.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
