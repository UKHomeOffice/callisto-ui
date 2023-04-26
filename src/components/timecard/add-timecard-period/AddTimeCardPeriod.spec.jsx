import { screen, waitFor } from '@testing-library/react';

import AddTimeCardPeriod from './AddTimeCardPeriod';
import { addTimePeriodHeading } from '../../../utils/time-entry-utils/timeEntryUtils';
import { renderWithApplicationContext } from '../../../test/helpers/TestApplicationContext';

describe('AddTimeCardPeriod component', () => {
  it('should display an add timecard period component', async () => {
    renderWithApplicationContext(<AddTimeCardPeriod />);

    await waitFor(() => {
      const addTimePeriodTitle = screen.queryByText(addTimePeriodHeading);

      expect(addTimePeriodTitle).toBeTruthy();
    });
  });
});
