import { useState, useContext, createContext, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import PropTypes from 'prop-types';
import { UrlSearchParamBuilder } from '../utils/api-utils/UrlSearchParamBuilder';
import { getTimePeriodTypes } from '../api/services/timecardService';

export const ApplicationContext = createContext();

const fetchTimePeriodTypesData = async () => {
  const params = new UrlSearchParamBuilder()
    .setTenantId('00000000-0000-0000-0000-000000000000')
    .getUrlSearchParams();
  const response = await getTimePeriodTypes(params);
  return response.data?.items;
  /* TODO: Error handling when server raises error, the above needs to be enclosed in a try catch block
    and use error handling similar to similar to:
    setSummaryErrors(error); */
};

export const ApplicationProvider = ({ children }) => {
  const [timePeriodTypes, setTimePeriodTypes] = useState([]);
  const { keycloak } = useKeycloak();
  const [userId, setUserId] = useState(keycloak.tokenParsed.personId);
  const [timecardClaim, setTimecardClaim] = useState(keycloak.tokenParsed.timecardClaim);

  const value = {
    timePeriodTypes,
    setTimePeriodTypes,
    userId,
    setUserId,
    timecardClaim,
    setTimecardClaim
  };

  useEffect(async () => {
    setTimePeriodTypes(await fetchTimePeriodTypesData());
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
