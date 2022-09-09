import { useState, useContext, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { UrlSearchParamBuilder } from '../utils/api-utils/UrlSearchParamBuilder';
import { getTimePeriodTypes } from '../api/services/timecardService';

export const ApplicationContext = createContext();

const fetchTimePeriodTypesData = async () => {
  try {
    const params = new UrlSearchParamBuilder()
      .setTenantId('00000000-0000-0000-0000-000000000000')
      .getUrlSearchParams();
    const response = await getTimePeriodTypes(params);
    return response.data?.items;
  } catch (error) {
    /* TODO: Error handling when server raises error, similar to:
      setSummaryErrors(error); */
    console.error(error);
  }
};

export const ApplicationProvider = ({ children }) => {
  const [timePeriodTypes, setTimePeriodTypes] = useState([]);

  const value = {
    timePeriodTypes,
    setTimePeriodTypes,
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
