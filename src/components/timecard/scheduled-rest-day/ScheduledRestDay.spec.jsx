import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithTimecardContext } from '../../../test/helpers/TimecardContext';
import ScheduledRestDay from './ScheduledRestDay';

const timecardDate = '2022-09-01';
const timecardDateNextDay = '2022-09-02';
const newTimeEntry = {
  timePeriodType: 'Scheduled rest day',
  timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
};

const timecardService = require('../../../api/services/timecardService');
const mockCreateTimeEntry = jest.spyOn(timecardService, 'createTimeEntry');

describe('ScheduledRestDay', () => {
  it('should display the correct time period type', () => {
    renderWithTimecardContext(<ScheduledRestDay />);

    const title = screen.getByText('Scheduled rest day');
    expect(title).toBeTruthy();
  });

  it('should call createTimeEntry when pressing save', async () => {
    const expectedActualStartTime = `${timecardDate}T00:00:00+00:00`;
    const expectedActualEndTime = `${timecardDateNextDay}T00:00:00+00:00`;

    renderWithTimecardContext(
      <ScheduledRestDay timeEntry={newTimeEntry} index={0} />,
      {
        timecardDate,
      }
    );

    act(() => {
      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(mockCreateTimeEntry).toHaveBeenCalledWith(
        {
          ownerId: 1,
          timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
          actualStartTime: expectedActualStartTime,
          actualEndTime: expectedActualEndTime,
        },
        new URLSearchParams([
          ['tenantId', '00000000-0000-0000-0000-000000000000'],
        ])
      );
    });
  });
});
