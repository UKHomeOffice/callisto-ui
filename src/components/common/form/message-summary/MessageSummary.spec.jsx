import { screen } from '@testing-library/react';
import { renderWithTimecardContext } from '../../../../test/helpers/TimecardContext';

import MessageSummary from './MessageSummary';

describe('MessageSummary', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  it('should render a summary component with all messages details', () => {
    const summaryMessages = {
      update: {
        template: `singleDateMoved`,
        variables: ['2022-09-21'],
      },
    };
    renderWithTimecardContext(
      <MessageSummary
        keys={['update']}
        messageSummary={summaryMessages}
        setSummaryMessages={jest.fn()}
        setIsAlertVisible={jest.fn()}
      />
    );

    const updateMessage = screen.getByText('The time period starts on');

    expect(updateMessage).toBeTruthy();
  });
});
