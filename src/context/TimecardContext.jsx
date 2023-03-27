import { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

export const TimecardContext = createContext();

export const TimecardProvider = ({ children }) => {
  const [newTimeEntry, setNewTimeEntry] = useState(); //Needs replacing with edit mode or similar

  const value = {
    newTimeEntry, //to go
    setNewTimeEntry,
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
