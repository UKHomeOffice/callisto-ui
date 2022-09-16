import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import {
  formatDate,
  formatDateTimeISO,
  removeTimecardContextEntry,
} from '../../../utils/time-entry-utils/timeEntryUtils';
import { UrlSearchParamBuilder } from '../../../utils/api-utils/UrlSearchParamBuilder';
import { useTimecardContext } from '../../../context/TimecardContext';
import { deepClone } from '../../../utils/common-utils/common-utils';
import {
  createTimeEntry,
  deleteTimeEntry,
} from '../../../api/services/timecardService';
import { ContextTimeEntry } from '../../../utils/time-entry-utils/ContextTimeEntry';

const ScheduledRestDay = ({ timeEntry, timeEntriesIndex }) => {
  const { timeEntries, setTimeEntries, timecardDate } = useTimecardContext();
  const timeEntryExists = !!timeEntry.timeEntryId;

  const handleClickRemoveButton = async (event) => {
    event.preventDefault();
    const params = new UrlSearchParamBuilder()
      .setTenantId('00000000-0000-0000-0000-000000000000')
      .getUrlSearchParams();
    const response = await deleteTimeEntry(timeEntry.timeEntryId, params);

    if (response.status === 200) {
      removeTimecardContextEntry(timeEntries, setTimeEntries, timeEntriesIndex);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const actualStartDate = formatDate(timecardDate);
    const actualStartDateTime = formatDateTimeISO(actualStartDate + ' 00:00');

    const actualEndDate = formatDate(dayjs(timecardDate).add(1, 'day'));
    const actualEndDateTime = formatDateTimeISO(actualEndDate + ' 00:00');

    const timecardPayload = {
      ownerId: 1,
      timePeriodTypeId: timeEntry.timePeriodTypeId,
      actualStartTime: actualStartDateTime,
      actualEndTime: actualEndDateTime,
    };

    const params = new UrlSearchParamBuilder()
      .setTenantId('00000000-0000-0000-0000-000000000000')
      .getUrlSearchParams();

    const response = await createTimeEntry(timecardPayload, params);

    if (response?.data?.items?.length > 0) {
      const newTimeEntries = deepClone(timeEntries);
      newTimeEntries[timeEntriesIndex] = ContextTimeEntry.createFrom(timeEntry)
        .setStartTime('00:00')
        .setFinishTime('00:00')
        .setTimeEntryId(response.data.items[0].id);

      setTimeEntries(newTimeEntries);
    }
  };

  const onCancel = (event) => {
    event.preventDefault();
    removeTimecardContextEntry(timeEntries, setTimeEntries, timeEntriesIndex);
  };

  return (
    <div className="select-timecard-period-type">
      <dl className="govuk-summary-list govuk-summary-list--no-border govuk-!-margin-bottom-0">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key govuk-!-width-two-thirds">
            Scheduled rest day
          </dt>
          <dd className="govuk-summary-list__actions">
            {timeEntryExists && (
              <Link
                onClick={handleClickRemoveButton}
                className="govuk-link govuk-link--no-visited-state"
                to={'/'}
              >
                Remove
                <span className="govuk-visually-hidden">
                  {' '}
                  scheduled rest day
                </span>
              </Link>
            )}
          </dd>
        </div>
        {!timeEntryExists && (
          <div className="govuk-summary-list__row govuk-summary-list__row--no-border">
            <dt className="govuk-summary-list__key">
              <form onSubmit={onSubmit}>
                <div className="govuk-button-group govuk-!-margin-bottom-0">
                  <button className="govuk-button" type="submit">
                    Save
                  </button>
                  <button
                    className="govuk-button govuk-button--secondary"
                    type="button"
                    onClick={onCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </dt>
          </div>
        )}
      </dl>
    </div>
  );
};

export default ScheduledRestDay;

ScheduledRestDay.propTypes = {
  timeEntry: PropTypes.object,
  timeEntriesIndex: PropTypes.number,
};
