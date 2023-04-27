import { screen, waitFor } from '@testing-library/react';

import AddTimeCardPeriod from './AddTimeCardPeriod';
import { addTimePeriodHeading } from '../../../utils/time-entry-utils/timeEntryUtils';
import { renderWithApplicationContext } from '../../../test/helpers/TestApplicationContext';
import { fireEvent } from '@testing-library/react';
import { act } from 'react-test-renderer';

describe('AddTimeCardPeriod component', () => {
  it('should display an add timecard period component', async () => {
    renderWithApplicationContext(<AddTimeCardPeriod />);

    await waitFor(() => {
      const addTimePeriodTitle = screen.queryByText(addTimePeriodHeading);

      expect(addTimePeriodTitle).toBeTruthy();
    });
  });

  it('should call setNewTimeEntry when the add button is clicked', async () => {
    const setNewTimeEntrySpy = jest.fn();
    const setSummaryErrorsSpy = jest.fn();

    renderWithApplicationContext(
      <AddTimeCardPeriod
        setAddNewTimeEntry={setNewTimeEntrySpy}
        setSummaryErrors={setSummaryErrorsSpy}
      />
    );

    act(() => {
      const addTimeCardPeriodButton = screen.getByText('Add');
      fireEvent.click(addTimeCardPeriodButton);
    });

    await waitFor(() => {
      expect(setSummaryErrorsSpy).toHaveBeenCalledWith([]);
      expect(setNewTimeEntrySpy).toHaveBeenCalledWith(true);
    });
  });
});
