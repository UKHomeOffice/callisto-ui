import { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

export const TimecardContext = createContext();

export const TimecardProvider = ({ children }) => {
  const [newTimeEntry, setNewTimeEntry] = useState(); //Needs replacing with edit mode or similar
  const [summaryMessages, setSummaryMessages] = useState({});
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const value = {
    newTimeEntry, //to go
    setNewTimeEntry,
    summaryMessages, //to go
    setSummaryMessages,
    isAlertVisible, //to be deleted
    setIsAlertVisible,
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
