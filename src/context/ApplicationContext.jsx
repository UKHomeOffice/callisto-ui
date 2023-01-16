import { useState, useContext, createContext, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import PropTypes from 'prop-types';
import { UrlSearchParamBuilder } from '../utils/api-utils/UrlSearchParamBuilder';
import { getTimePeriodTypes } from '../api/services/timecardService';
import { validateServiceErrors } from '../utils/api-utils/ApiUtils';

export const ApplicationContext = createContext();

const setTimePeriodTypesData = async (setTimePeriodTypes, setServiceError) => {
  const params = new UrlSearchParamBuilder()
    .setTenantId('00000000-0000-0000-0000-000000000000')
    .getUrlSearchParams();

  validateServiceErrors(setServiceError, async () => {
    const response = await getTimePeriodTypes(params);
    setTimePeriodTypes(response.data?.items);
  });
};

export const ApplicationProvider = ({ children }) => {
  const [timePeriodTypes, setTimePeriodTypes] = useState([]);
  const [serviceError, setServiceError] = useState({
    hasError: false,
    recoverable: true,
  });
  const { keycloak } = useKeycloak();
  const [userId, setUserId] = useState(keycloak.tokenParsed.personId);
  const [timecardClaim, setTimecardClaim] = useState(
    keycloak.tokenParsed.timecardClaim
  );

  const value = {
    timePeriodTypes,
    setTimePeriodTypes,
    serviceError,
    setServiceError,
    userId,
    setUserId,
    timecardClaim,
    setTimecardClaim,
  };

  useEffect(() => {
    setTimePeriodTypesData(setTimePeriodTypes, setServiceError);
  }, []);

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
