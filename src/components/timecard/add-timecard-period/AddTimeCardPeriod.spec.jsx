import { renderWithTimecardContext } from '../../../test/helpers/TimecardContext';
import { screen, waitFor } from '@testing-library/react';

import AddTimeCardPeriod from './AddTimeCardPeriod';

describe('AddTimeCardPeriod component', () => {
  it('should display an add timecard period component when timecard is empty', async () => {
    renderWithTimecardContext(<AddTimeCardPeriod timecardEmpty={true} />);

    await waitFor(() => {
      const addTimePeriodTitle = screen.queryByText('Add time period');
      const addTimePeriodDescription = screen.queryByText(
        'Use this to record a shift'
      );

      expect(addTimePeriodTitle).toBeTruthy();
      expect(addTimePeriodDescription).toBeTruthy();
    });
  });

  it('should display an add timecard period component when timecard is not empty', async () => {
    renderWithTimecardContext(<AddTimeCardPeriod timecardEmpty={false} />);

    await waitFor(() => {
      const addTimePeriodTitle = screen.queryByText('Add another time period');
      const addTimePeriodDescription = screen.queryByText(
        'Use this to record overtime or another shift'
      );

      expect(addTimePeriodTitle).toBeTruthy();
      expect(addTimePeriodDescription).toBeTruthy();
    });
  });
});
