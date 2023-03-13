import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithTimecardContext } from '../../../../../src/test/helpers/TimecardContext';
import SingleDateMoved from './SingleDateMoved';

describe('SingleDateMoved', () => {
  it('should render a summary message with a date link', async () => {
    renderWithTimecardContext(
      <SingleDateMoved
        variables={['2022-09-21']}
        setSummaryMessages={jest.fn()}
        setIsAlertVisible={jest.fn()}
      />
    );

    await waitFor(() => {
      const message = screen.getByText('The time period starts on');
      expect(message).toBeTruthy();

      const dateLink = screen.getByRole('link', { name: '21 September' });
      expect(dateLink.pathname).toBe('/timecard/2022-09-21');
      fireEvent.click(dateLink);
    });
  });
});
