import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import { initAll } from 'govuk-frontend';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import FormsExample from './pages/FormsExample';
import Home from './pages/Home';
import Timecard from './pages/timecard/Timecard';
import { TimecardProvider } from './context/TimecardContext';

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',

        responseMode: 'query',
      }}
    >
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index="true" element={<Home />} />
            <Route
              path="/timecard/:date"
              element={
                <TimecardProvider>
                  <Timecard />
                </TimecardProvider>
              }
            />
            <Route
              path="/timecard"
              element={
                <TimecardProvider>
                  <Timecard />
                </TimecardProvider>
              }
            />
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
      </HashRouter>
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
initAll();
