import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
import { initAll } from 'govuk-frontend';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import PrivateRoute from './helpers/PrivateRoute';
import FormsExample from './pages/FormsExample';
import Home from './pages/Home';

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index="true" element={<Home />} />
            <Route
              path="/forms"
              element={
                <PrivateRoute>
                  <FormsExample />
                </PrivateRoute>
              }
            />
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
