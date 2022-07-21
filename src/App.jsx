import { Outlet } from 'react-router-dom';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';

const App = () => {
  const { initialized, keycloak } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  });

  return keycloak.authenticated ? (
    <div className="App">
      <HashLink
        to="#main-content"
        className="govuk-skip-link"
        data-module="govuk-skip-link"
      >
        Skip to main content
      </HashLink>
      <Header />
      <div className="govuk-width-container ">
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  ) : (
    <div></div>
  );
};

export default App;
