import { screen, waitFor } from '@testing-library/react';

import AddTimeCardPeriod from './AddTimeCardPeriod';
import { addTimePeriodHeading } from '../../../utils/time-entry-utils/timeEntryUtils';
import { renderWithApplicationContext } from '../../../test/helpers/TestApplicationContext';

describe('AddTimeCardPeriod component', () => {
  it('should display an add timecard period component when timecard is empty', async () => {
    renderWithApplicationContext(<AddTimeCardPeriod timecardEmpty={true} />);

    await waitFor(() => {
      const addTimePeriodTitle = screen.queryByText(addTimePeriodHeading);

      expect(addTimePeriodTitle).toBeTruthy();
    });
  });

  it('should display an add timecard period component when timecard is not empty', async () => {
    renderWithApplicationContext(<AddTimeCardPeriod timecardEmpty={false} />);

    await waitFor(() => {
      const addTimePeriodTitle = screen.queryByText(addTimePeriodHeading);

      expect(addTimePeriodTitle).toBeTruthy();
    });
  });
});
