import { Link, useParams } from 'react-router-dom';
import BackLink from '../../components/common/form/navigation/backlink/BackLink';
import dayjs from 'dayjs';

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

      {/* <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          navigate('/');
        })}
        style={{
          border: '1px solid #b1b4b6',
          padding: '15px',
          backgroundColor: 'white',
        }}
      >
        <Radios
          name="shiftType"
          heading="Add a new time period"
          headingSize="s"
          options={[
            'Shift',
            'Scheduled rest day',
            'Non-working day',
            'On call',
            'Absence',
            'Training',
            'Overtime',
          ]}
          errors={errors}
          {...register('shiftType', {
            required: {
              value: true,
              message: 'Select a shift type',
            },
          })}
        />

        <button
          className="govuk-button govuk-padding-"
          data-module="govuk-button"
          type="submit"
        >
          Save and continue
        </button>
      </form> */}
    </>
  );
};

export default Timecard;
