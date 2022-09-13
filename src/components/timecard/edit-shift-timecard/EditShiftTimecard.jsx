import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import EditShiftHours from '../edit-shift-hours/EditShiftHours';
import { deleteTimeEntry } from '../../../api/services/timecardService';
import { UrlSearchParamBuilder } from '../../../utils/api-utils/UrlSearchParamBuilder';
import { useTimecardContext } from '../../../context/TimecardContext';
import { deepClone } from '../../../utils/common-utils/common-utils';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { styled, Box } from '@mui/system';
import clsx from 'clsx';

import * as React from 'react';

const BackdropUnstyled = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
  border: '2px solid currentColor',
  boxShadow: 24,
  padding: '16px 32px 24px 32px',
});

const EditShiftTimecard = ({ timeEntry, timeEntriesIndex }) => {
  const toggleEditShiftHours = (event) => {
    event.preventDefault();
    setShowEditShiftHours(!showEditShiftHours);
  };

  const [open, setOpen] = useState(false);

  const { timeEntries, setTimeEntries } = useTimecardContext();

  const timeEntryIsEmpty =
    'startTime' in timeEntry && timeEntry.startTime !== '';
  const [showEditShiftHours, setShowEditShiftHours] = useState(
    !timeEntryIsEmpty
  );

  const handleOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const clickRemoveShiftButton = async (event) => {
    event.preventDefault();
    const params = new UrlSearchParamBuilder()
      .setTenantId('00000000-0000-0000-0000-000000000000')
      .getUrlSearchParams();
    const response = await deleteTimeEntry(timeEntry.timeEntryId, params);

    if (response.status === 200) {
      const newTimeEntries = deepClone(timeEntries);
      newTimeEntries.splice(timeEntriesIndex, 1);
      setTimeEntries(newTimeEntries);
    }
  };

  return (
    <div className="select-timecard-period-type">
      <dl className="govuk-summary-list govuk-!-margin-bottom-0">
        <div className="govuk-summary-list__row">
          <dt
            className="govuk-summary-list__key govuk-!-width-two-thirds"
            style={{ paddingBottom: '20px', paddingTop: '10px' }}
          >
            Shift
          </dt>
          <dd className="govuk-summary-list__value"></dd>
          <dd className="govuk-summary-list__actions" style={{ width: '10%' }}>
            {timeEntryIsEmpty && (
              <Link
                onClick={handleOpen}
                className="govuk-link govuk-link--no-visited-state"
                to={'/'}
              >
                Remove<span className="govuk-visually-hidden"> shift</span>
              </Link>
            )}
          </dd>
        </div>
        <div className="govuk-summary-list__row govuk-summary-list__row--no-border">
          <dt
            className="govuk-summary-list__key"
            style={{ paddingBottom: '20px', paddingTop: '20px' }}
          >
            Hours
          </dt>
          <dd className="govuk-summary-list__value">
            {!showEditShiftHours &&
              timeEntryIsEmpty &&
              `${timeEntry.startTime} to ${
                timeEntry.finishTime ? timeEntry.finishTime : '-'
              }`}
          </dd>
          <dd className="govuk-summary-list__actions">
            {timeEntryIsEmpty && (
              <Link
                onClick={toggleEditShiftHours}
                className="govuk-link govuk-link--no-visited-state"
                to={'/'}
                data-testid="hours-change-button"
              >
                Change<span className="govuk-visually-hidden"> hours</span>
              </Link>
            )}
          </dd>
        </div>
        {showEditShiftHours && (
          <div className="govuk-summary-list__row govuk-summary-list__row--no-border">
            <dt className="govuk-summary-list__key">
              <EditShiftHours
                setShowEditShiftHours={setShowEditShiftHours}
                timeEntry={timeEntry}
                timeEntriesIndex={timeEntriesIndex}
              />
            </dt>
          </div>
        )}
        <div
          className="govuk-summary-list__row govuk-summary-list__row--no-border"
          style={{ borderTop: '1px solid #b1b4b6' }}
        >
          <dt
            className="govuk-summary-list__key"
            style={{
              paddingBottom: '10px',
              paddingTop: '20px',
            }}
          >
            Meal break
          </dt>
          <dd className="govuk-summary-list__value"></dd>
          <dd className="govuk-summary-list__actions">
            {timeEntryIsEmpty && (
              <Link
                className="govuk-link govuk-link--no-visited-state"
                to={'/'}
                data-testid="meal-break-change-button"
              >
                Change<span className="govuk-visually-hidden"> meal break</span>
              </Link>
            )}
          </dd>
        </div>
      </dl>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        components={{ Backdrop }}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title">
            Are you sure you want to remove this time period?
          </h2>
          <p id="unstyled-modal-description">
            Once you remove it you cannot undo this action
          </p>
          <button
            onClick={clickRemoveShiftButton}
            className="govuk-button--link govuk-link"
          >
            Yes, remove it
          </button>
          <button className="govuk-button--link govuk-link">No, Cancel</button>
        </Box>
      </Modal>
    </div>
  );
};

export default EditShiftTimecard;

EditShiftTimecard.propTypes = {
  timeEntry: PropTypes.object,
  timeEntriesIndex: PropTypes.number,
};
