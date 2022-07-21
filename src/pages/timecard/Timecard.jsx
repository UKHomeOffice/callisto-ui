import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEffect, useState, createContext } from 'react';

import BackLink from '../../components/common/form/navigation/backlink/BackLink';
import SelectTimecardPeriodType from '../../components/timecard/select-timecard-period-type/SelectTimecardPeriodType';
import ErrorSummary from '../../components/common/form/error-summary/ErrorSummary';
import generateDocumentTitle from '../../utils/generate-document-title/generateDocumentTitle';
import EditShiftTimecard from '../../components/timecard/edit-shift-timecard/EditShiftTimecard';

export const TimecardContext = createContext();

const Timecard = () => {
  const { date } = useParams();
  const previousDay = dayjs(date).subtract(1, 'day').format('YYYY-MM-DD');
  const nextDay = dayjs(date).add(1, 'day').format('YYYY-MM-DD');

  const [timecardEntryExists, setTimecardEntryExists] = useState(false);
  const [summaryErrors, setSummaryErrors] = useState({});

  const [timecardData, setTimecardData] = useState({
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    document.title = generateDocumentTitle('Timecard');
  });

  return (
    <TimecardContext.Provider
      value={{ summaryErrors, setSummaryErrors, timecardData, setTimecardData }}
    >
      <BackLink text="Back to calendar" link="/calendar" />
      {summaryErrors && Object.keys(summaryErrors).length !== 0 && (
        <ErrorSummary errors={summaryErrors} />
      )}
      <h1 className="govuk-caption-m">My Timecard</h1>
      <h2 className="govuk-heading-m">{dayjs(date).format('DD MMMM YYYY')}</h2>
      <div className="govuk-button-group">
        <Link
          className="govuk-link govuk-link--no-visited-state"
          to={`/timecard/${previousDay}`}
        >
          Previous day
        </Link>
        <Link
          className="govuk-link govuk-link--no-visited-state"
          to={`/timecard/${nextDay}`}
        >
          Next day
        </Link>
        <Link
          className="govuk-link govuk-link--no-visited-state"
          to="/calendar"
        >
          Select another date
        </Link>
      </div>

      {!timecardEntryExists ? (
        <SelectTimecardPeriodType
          setTimecardEntryExists={setTimecardEntryExists}
        />
      ) : (
        <EditShiftTimecard />
      )}
    </TimecardContext.Provider>
  );
};

export default Timecard;
