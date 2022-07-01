import { Link, useParams } from 'react-router-dom';
import BackLink from '../../components/common/form/navigation/backlink/BackLink';
import dayjs from 'dayjs';

const Timecard = () => {
  const { date } = useParams();
  const previousDay = dayjs(date).subtract(1, 'day').format('YYYY-MM-DD');

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
      </div>
    </>
  );
};

export default Timecard;
