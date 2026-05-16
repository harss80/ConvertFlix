import React, { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

// Fix for react-filerobot-image-editor which requires React to be globally available
(window as any).React = React;
import { MantineProvider, LoadingOverlay } from '@mantine/core';

import '@mantine/core/styles.css';

// Lazy load the main App component
const App = lazy(() => import('./App'));

// Add performance monitoring in development
if (import.meta.env.DEV) {
  const { webVitals } = await import('./utils/webVitals');
  webVitals();
}

// Create root with concurrent mode
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <Suspense 
        fallback={
          <div style={{ width: '100vw', height: '100vh' }}>
            <LoadingOverlay visible overlayProps={{ blur: 2 }} />
          </div>
        }
      >
        <App />
      </Suspense>
    </MantineProvider>
  </StrictMode>
);
