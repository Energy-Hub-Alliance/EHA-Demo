import { StrictMode, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { persistor, store } from './store/store';
import { AppThemeProvider } from './core/theme/mui-theme';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import { SplashScreen } from './core/components/pages/splashScreen/SplashScreen';
import { environment } from './environment';

export const Shell = () => {
  const client = new Keycloak({
    url: environment.auth.keycloakUrl,
    realm: environment.auth.keycloakRealm,
    clientId: environment.auth.keycloakClientId,
  });
  const hasSeenSplashScreen = localStorage.getItem('firstVisit');
  const [, setIsRun] = useState(false);

  if (hasSeenSplashScreen !== 'firstVisit') {
    localStorage.setItem('firstVisit', 'firstVisit');
    setTimeout(() => {
      setIsRun(true);
    }, 2000);
    return <SplashScreen />;
  }

  return (
    <ReactKeycloakProvider
      authClient={client}
      initOptions={{ onLoad: 'login-required' }}
      onTokens={(tokens) => {
        if (tokens.idToken) {
          localStorage.setItem('idToken', tokens.idToken);
        }
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StrictMode>
            <BrowserRouter>
              <AppThemeProvider>
                <App />
              </AppThemeProvider>
            </BrowserRouter>
          </StrictMode>
        </PersistGate>
      </Provider>
    </ReactKeycloakProvider>
  );
};
