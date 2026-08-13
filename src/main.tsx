import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Upright weight axis only — the site uses no italics, so the italic
// variable files are left out of the bundle entirely.
import '@fontsource-variable/outfit/wght.css';
import '@fontsource-variable/work-sans/wght.css';
import '@fontsource-variable/jetbrains-mono/wght.css';
import './styles/global.css';

import { App } from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
