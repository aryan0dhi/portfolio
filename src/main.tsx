import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Display serif is Fraunces with the optical-size axis (standard = wght + opsz),
// so large headings pick up higher contrast and fine detail automatically.
// No italics anywhere on the site, so the italic variable files stay out of the bundle.
import '@fontsource-variable/fraunces/standard.css';
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
