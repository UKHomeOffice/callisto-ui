import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
import { initAll } from 'govuk-frontend';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import FormsExample from './pages/FormsExample';
import Home from './pages/Home';
import TimecardPeriodType from './pages/timecard/timecard-period-type/TimecardPeriodType';

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index="true" element={<Home />} />
            <Route
              path="/timecard/select-time-period-type/:date"
              element={<TimecardPeriodType />}
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
      </BrowserRouter>
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
initAll();
