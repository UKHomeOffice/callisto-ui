import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import { initAll } from 'govuk-frontend';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import FormsExample from './pages/FormsExample';
import Home from './pages/Home';
import Timecard from './pages/timecard/Timecard';
import Accruals from './pages/accruals/Accruals';

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index="true" element={<Home />} />
            <Route path="/timecard/:date" element={<Timecard />} />
            <Route path="/forms" element={<FormsExample />} />
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <h3>There&apos;s nothing here!</h3>
                </main>
              }
            />
          </Route>
          <Route path="/" element={<App />}>
            <Route index="true" element={<Home />} />
            <Route path="/accruals/:date" element={<Accruals />} />
            <Route path="/forms" element={<FormsExample />} />
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <h3>There&apos;s nothing here!</h3>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ReactKeycloakProvider>,
  document.getElementById('root')
);
initAll();
