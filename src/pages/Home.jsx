import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';

const Home = () => {
  const { initialized, keycloak } = useKeycloak();

  useEffect(() => {
    console.log('running on render');
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  });

  return <h1 className="govuk-heading-xl">Home page</h1>;
};

export default Home;
