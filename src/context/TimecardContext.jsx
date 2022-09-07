import { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utils/time-entry-utils/timeEntryUtils';
import dayjs from 'dayjs';

export const TimecardContext = createContext();

export const TimecardProvider = ({ children }) => {
  const [summaryErrors, setSummaryErrors] = useState({});
  const [timeEntries, setTimeEntries] = useState([
    // {
    //   timeEntryId: '',
    //   timePeriodType: '',
    //   startTime: '',
    //   finishTime: '',
    //   startDate: '',
    //   finishDate: '',
    //   timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
    // },
  ]);
  const [timecardDate, setTimecardDate] = useState(formatDate(dayjs()));

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
