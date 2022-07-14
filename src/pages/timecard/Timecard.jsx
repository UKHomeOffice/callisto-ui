import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import BackLink from '../../components/common/form/navigation/backlink/BackLink';
import SelectTimecardPeriodType from '../../components/timecard/select-timecard-period-type/SelectTimecardPeriodType';
import ErrorSummary from '../../components/common/form/error-summary/ErrorSummary';
import generateDocumentTitle from '../../utils/generate-document-title/generateDocumentTitle';
import EditShiftTimecard from '../../components/timecard/edit-shift-timecard/EditShiftTimecard';
import { useState } from 'react';

const Timecard = () => {
  const { date } = useParams();
  const previousDay = dayjs(date).subtract(1, 'day').format('YYYY-MM-DD');
  const nextDay = dayjs(date).add(1, 'day').format('YYYY-MM-DD');

  const [timecardEntryExists, setTimecardEntryExists] = useState(false);
  // const [errors, setErrors] = useState({});
  const errors = {};

  useEffect(() => {
    document.title = generateDocumentTitle('Add time period');
  });

  return (
    <>
      <BackLink text="Back to calendar" link="/calendar" />
      {errors && Object.keys(errors).length !== 0 && (
        <ErrorSummary errors={errors} />
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
    </>
  );
};

export default Timecard;
