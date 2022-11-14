import { renderWithTimecardContext } from '../../../test/helpers/TimecardContext';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';

import AddTimeCardPeriod from './AddTimeCardPeriod';
import { addTimePeriodHeading } from '../../../utils/time-entry-utils/timeEntryUtils';

describe('AddTimeCardPeriod component', () => {
  it('should display an add timecard period component when timecard is empty', async () => {
    renderWithTimecardContext(<AddTimeCardPeriod timecardEmpty={true} />);

    await waitFor(() => {
      const addTimePeriodTitle = screen.queryByText(addTimePeriodHeading);

      expect(addTimePeriodTitle).toBeTruthy();
    });
  });

  it('should display an add timecard period component when timecard is not empty', async () => {
    renderWithTimecardContext(<AddTimeCardPeriod timecardEmpty={false} />);

    await waitFor(() => {
      const addTimePeriodTitle = screen.queryByText(addTimePeriodHeading);

      expect(addTimePeriodTitle).toBeTruthy();
    });
  });

  it('should call setNewTimeEntry when the add button is clicked', async () => {
    const setNewTimeEntrySpy = jest.fn();
    const setSummaryErrorsSpy = jest.fn();

    renderWithTimecardContext(<AddTimeCardPeriod timecardEmpty={false} />, {
      newTimeEntry: true,
      setNewTimeEntry: setNewTimeEntrySpy,
      setSummaryErrors: setSummaryErrorsSpy,
    });

    act(() => {
      const addTimeCardPeriodButton = screen.getByText('Add');
      fireEvent.click(addTimeCardPeriodButton);
    });

    await waitFor(() => {
      expect(setSummarryErrorsSpy).toHaveBeenCalledWith({});
      expect(setNewTimeEntrySpy).toHaveBeenCalledWith(true);
    });
  });
});
