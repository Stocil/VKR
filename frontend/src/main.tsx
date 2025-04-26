import { StrictMode } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { SnackbarProvider } from 'notistack';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { AccessProvider } from 'features/access-provider';

import { clientId } from './constants';
import { Router } from './routes';
import { store } from './store';
import { ThemeModeProvider } from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <ThemeModeProvider>
          <AccessProvider>
            <SnackbarProvider>
              <Router />
            </SnackbarProvider>
          </AccessProvider>
        </ThemeModeProvider>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
);
