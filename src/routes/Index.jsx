import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import { useKeycloak } from '@react-keycloak/web';

import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';

import { PrivateRoute } from './utils';

export const AppRouter = () => {
  const { initialized, keycloak } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if(!keycloak.authenticated){
    keycloak.login();
  }

  return (
    <BrowserRouter>
      <Redirect from="/" to="/home" />
      <PrivateRoute path="/home" component={HomePage} />
      <Route path="/login" component={LoginPage} />
    </BrowserRouter>
  );
};
