import { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

export const TimecardContext = createContext();

export const TimecardProvider = ({ children }) => {
  const [timePeriodTypes, setTimePeriodTypes] = useState([]);
  const [summaryErrors, setSummaryErrors] = useState({});
  const [timeEntries, setTimeEntries] = useState([]);
  const [timecardDate, setTimecardDate] = useState();
  const [newTimeEntry, setNewTimeEntry] = useState();
  const [summaryMessages, setSummaryMessages] = useState({});
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const value = {
    summaryErrors, //to go
    setSummaryErrors,
    timeEntries, //to go
    setTimeEntries,
    newTimeEntry, //to go
    setNewTimeEntry,
    summaryMessages, //to go
    setSummaryMessages,
    isAlertVisible, //to be deleted
    setIsAlertVisible,
    isErrorVisible, //to be deleted
    setIsErrorVisible,
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
