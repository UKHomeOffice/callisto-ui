import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import './i18n';
import { initAll } from 'govuk-frontend';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';

ReactDOM.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={{
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
        window.location.origin + '/silent-check-sso.html',

      responseMode: 'query',
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ReactKeycloakProvider>,
  document.getElementById('root')
);
initAll();
