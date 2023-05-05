/* eslint-disable prettier/prettier */
import { Link, useParams } from 'react-router-dom';
import { useApplicationContext } from '../../context/ApplicationContext';
import {
  formatDate,
} from '../../utils/time-entry-utils/timeEntryUtils';
import dayjs from 'dayjs';
import AnnualTargetHours from '../../components/annual-target-hours/accruals/AnnualTargetHours';

const Accruals = () => {
  const { setServiceError, userId } = useApplicationContext();
  const { date: timecardDate } = useParams();
  const previousDay = formatDate(dayjs(timecardDate).subtract(1, 'day'));
  const nextDay = formatDate(dayjs(timecardDate).add(1, 'day'));
 
  return (
    <>
      <h1 className="govuk-caption-m">My accruals balance as of</h1>
      <h2 className="govuk-heading-m">
        {dayjs(timecardDate).format('D MMMM YYYY')}
      </h2>
      <div className="govuk-button-group button-group-row">
        <Link
          onClick={() => {}}
          className="govuk-link govuk-link--no-visited-state"
          to={`/accruals/${previousDay}`}
        >
          Previous day
        </Link>
        <Link
          onClick={() => {}}
          className="govuk-link govuk-link--no-visited-state"
          to={`/accruals/${nextDay}`}
        >
          Next day
        </Link>
      </div>
      <AnnualTargetHours />
    </>
  );
};

export default Accruals;
