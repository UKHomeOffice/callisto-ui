import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import {
  formatDateTimeISO,
  formatTime,
  removeTimecardContextEntry,
} from '../../../utils/time-entry-utils/timeEntryUtils';
import { UrlSearchParamBuilder } from '../../../utils/api-utils/UrlSearchParamBuilder';
import { useApplicationContext } from '../../../context/ApplicationContext';
import { useTimecardContext } from '../../../context/TimecardContext';
import { deepCloneJson } from '../../../utils/common-utils/common-utils';
import {
  createTimeEntry,
  deleteTimeEntry,
} from '../../../api/services/timecardService';
import { ContextTimeEntry } from '../../../utils/time-entry-utils/ContextTimeEntry';
import { validateServiceErrors } from '../../../utils/api-utils/ApiUtils';

const SimpleTimePeriod = ({ timeEntry, timeEntriesIndex, timePeriodTitle }) => {
  const { setServiceError, userId } = useApplicationContext();
  const { timeEntries, setTimeEntries, timecardDate } = useTimecardContext();
  const timeEntryExists = !!timeEntry.timeEntryId;

  const handleClickRemoveButton = async (event) => {
    event.preventDefault();
    const params = new UrlSearchParamBuilder()
      .setTenantId('00000000-0000-0000-0000-000000000000')
      .getUrlSearchParams();

    validateServiceErrors(setServiceError, async () => {
      await deleteTimeEntry(timeEntry.timeEntryId, params);
      removeTimecardContextEntry(timeEntries, setTimeEntries, timeEntriesIndex);
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const actualStartDateTime = formatDateTimeISO(
      dayjs(timecardDate).startOf('day')
    );
    const actualEndDateTime = formatDateTimeISO(
      dayjs(timecardDate).startOf('day').add(1, 'day')
    );

    const timecardPayload = {
      ownerId: userId,
      timePeriodTypeId: timeEntry.timePeriodTypeId,
      actualStartTime: actualStartDateTime,
      actualEndTime: actualEndDateTime,
    };

    const params = new UrlSearchParamBuilder()
      .setTenantId('00000000-0000-0000-0000-000000000000')
      .getUrlSearchParams();

    validateServiceErrors(setServiceError, async () => {
      const response = await createTimeEntry(timecardPayload, params);

      if (response?.data?.items?.length > 0) {
        const formattedStartTime = formatTime(
          response.data.items[0].actualStartTime
        );
        const formattedEndTime = formatTime(
          response.data.items[0].actualEndTime
        );

        const newTimeEntries = deepCloneJson(timeEntries);
        newTimeEntries[timeEntriesIndex] = ContextTimeEntry.createFrom(
          timeEntry
        )
          .setStartTime(formattedStartTime)
          .setFinishTime(formattedEndTime)
          .setTimeEntryId(response.data.items[0].id);

        setTimeEntries(newTimeEntries);
      }
    });
  };

  const onCancel = (event) => {
    event.preventDefault();
    removeTimecardContextEntry(timeEntries, setTimeEntries, timeEntriesIndex);
  };

  return (
    <div className="grey-border">
      <dl className="govuk-summary-list govuk-summary-list--no-border govuk-!-margin-bottom-0">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key govuk-!-width-two-thirds">
            {timePeriodTitle}
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
                  {timePeriodTitle?.toLowerCase()}
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

export default SimpleTimePeriod;

SimpleTimePeriod.propTypes = {
  timeEntry: PropTypes.object,
  timeEntriesIndex: PropTypes.number,
  timePeriodTitle: PropTypes.string,
};
