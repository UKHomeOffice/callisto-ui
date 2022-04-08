/* eslint-disable react/prop-types */
import { useKeycloak } from '@react-keycloak/web';

const PrivateRoute = ({ children }) => {
  const { keycloak } = useKeycloak();

  console.log('children: ' + children);

  const isLoggedIn = keycloak.authenticated;

  return isLoggedIn ? children : null;
};

export default PrivateRoute;
