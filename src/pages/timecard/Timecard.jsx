import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import BackLink from '../../components/common/form/navigation/backlink/BackLink';
import AddShift from '../../components/timecard/add-shift/AddShift';

const Timecard = () => {
  const { date } = useParams();
  const previousDay = dayjs(date).subtract(1, 'day').format('YYYY-MM-DD');
  const nextDay = dayjs(date).add(1, 'day').format('YYYY-MM-DD');

  return (
    <>
      <BackLink text="Back to calendar" link="/calendar" />
      <h1 className="govuk-caption-m">My Timecard</h1>
      <h1 className="govuk-heading-m">{dayjs(date).format('DD MMMM YYYY')}</h1>
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
          Choose another day
        </Link>
      </div>

      <AddShift />
    </>
  );
};

export default Timecard;
