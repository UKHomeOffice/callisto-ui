import { screen, waitFor, render } from '@testing-library/react';
import { renderWithTimecardContext } from '../../../../test/helpers/TimecardContext';

import MessageItem from './MessageItem';

describe('MessageItem', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  it('should render a summary component with all messages details', () => {
    const summaryMessages = {
      update: {
        template: `singleDateMoved`,
        variables: ['2022-09-21'],
      },
    };
    renderWithTimecardContext(
      <MessageItem
        keys={['update']}
        messageSummary={summaryMessages}
        setSummaryMessages={jest.fn()}
        setIsAlertVisible={jest.fn()}
      />
    );

    const updateMessage = screen.getByText('The time period starts on');

    expect(updateMessage).toBeTruthy();
  });

  it('should not render a message if the key is not listed', async () => {
    const summaryMessages = {
      unknownKey: {
        template: `singleDateMoved`,
        variables: ['2022-09-21'],
      },
    };
    renderWithTimecardContext(
      <MessageItem
        keys={['unknownKey']}
        messageSummary={summaryMessages}
        setSummaryMessages={jest.fn()}
        setIsAlertVisible={jest.fn()}
      />
    );

    const updateMessage = screen.queryByText('The time period starts on');

    expect(updateMessage).toBeFalsy();
  });
});
