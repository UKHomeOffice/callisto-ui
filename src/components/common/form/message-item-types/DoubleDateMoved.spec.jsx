import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithTimecardContext } from '../../../../test/helpers/TimecardContext';
import SingleDateMoved from './DoubleDateMoved';

describe('DoubleDateMoved', () => {
  it('should render a summary message with two date links', async () => {
    renderWithTimecardContext(
      <SingleDateMoved
        variables={['2022-09-21', '2022-09-22']}
        setSummaryMessages={jest.fn()}
        setIsAlertVisible={jest.fn()}
      />
    );

    await waitFor(() => {
      const message = screen.getByText(
        'The time period starts on and finishes on'
      );
      expect(message).toBeTruthy();

      const startDateLink = screen.getByRole('link', { name: '21 September' });
      expect(startDateLink.pathname).toBe('/timecard/2022-09-21');

      const endDateLink = screen.getByRole('link', { name: '22 September' });
      expect(endDateLink.pathname).toBe('/timecard/2022-09-22');
      fireEvent.click(endDateLink);
    });
  });
});
