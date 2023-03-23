import { useState, useContext, createContext } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import PropTypes from 'prop-types';

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [serviceError, setServiceError] = useState({
    hasError: false,
    recoverable: true,
  });
  const { keycloak } = useKeycloak();
  const [userId, setUserId] = useState(keycloak.tokenParsed.personId);

  const value = {
    serviceError,
    setServiceError,
    userId,
    setUserId,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  return useContext(ApplicationContext);
};

ApplicationProvider.propTypes = {
  children: PropTypes.element,
};
