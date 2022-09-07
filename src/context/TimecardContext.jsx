import { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

export const TimecardContext = createContext();

export const TimecardProvider = ({ children }) => {
  const [summaryErrors, setSummaryErrors] = useState({});
  const [timecardData, setTimecardData] = useState([
    {
      timeEntryId: '',
      timePeriodType: '',
      startTime: '',
      finishTime: '',
      startDate: '',
      finishDate: '',
      timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
    },
  ]);

  const value = {
    summaryErrors,
    setSummaryErrors,
    timecardData,
    setTimecardData,
  };

  return (
    <TimecardContext.Provider value={value}>
      {children}
    </TimecardContext.Provider>
  );
};

export const useTimecardContext = () => {
  return useContext(TimecardContext);
};

TimecardProvider.propTypes = {
  children: PropTypes.element,
};
