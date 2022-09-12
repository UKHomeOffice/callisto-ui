import { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

export const TimecardContext = createContext();

export const TimecardProvider = ({ children }) => {
  const [summaryErrors, setSummaryErrors] = useState({});
  const [timeEntries, setTimeEntries] = useState([]);
  const [timecardDate, setTimecardDate] = useState();

  const value = {
    summaryErrors,
    setSummaryErrors,
    timeEntries,
    setTimeEntries,
    timecardDate,
    setTimecardDate,
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
