import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';
import { ApplicationProvider } from './context/ApplicationContext';
import ErrorBoundary from './components/error/error-boundary/ErrorBoundary';
import FormsExample from './pages/FormsExample';
import Home from './pages/Home';
import Timecard from './pages/timecard/Timecard';
import Accruals from './pages/accruals/Accruals';

const App = () => {
  const { initialized, keycloak } = useKeycloak();

  useEffect(async () => {
    if (initialized && !keycloak.authenticated) {
      await keycloak.login();
    }
  });

  return keycloak.authenticated ? (
    <ApplicationProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="govuk-width-container">
            <main className="govuk-main-wrapper" id="main-content" role="main">
              <ErrorBoundary>
                <Routes>
                  <Route index="true" element={<Home />} />
                  <Route path="/timecard/:date" element={<Timecard />} />
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
                </Routes>
              </ErrorBoundary>
            </main>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </ApplicationProvider>
  ) : (
    <div></div>
  );
};

export default App;
