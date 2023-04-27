import { screen } from '@testing-library/react';
import MessageItem from './MessageItem';
import { renderWithApplicationContext } from '../../../../test/helpers/TestApplicationContext';

describe('MessageItem', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  it('should render a summary component with a single date and messages details', () => {
    const summaryMessages = {
      key: 'datesMoved',
      template: `DatesMoved`,
      variables: { startDate: '21 September' },
    };

    renderWithApplicationContext(
      <MessageItem message={summaryMessages} setSummaryMessages={jest.fn()} />
    );

    const updateMessage = screen.getByText('The time period starts on');

    expect(updateMessage).toBeTruthy();
  });

  it('should render a summary component with two dates and message details', () => {
    const summaryMessages = {
      key: 'datesMoved',
      template: `DatesMoved`,
      variables: { startDate: '2022-09-21', endDate: '2022-09-21' },
    };
    renderWithApplicationContext(
      <MessageItem message={summaryMessages} setSummaryMessages={jest.fn()} />
    );

    const updateMessage = screen.getByText(
      'The time period starts on and finishes on'
    );

    expect(updateMessage).toBeTruthy();
  });

  it('should not render a message if the key is not listed', async () => {
    const summaryMessages = {
      key: 'wrongKey',
      template: `wrongTemplate`,
      variables: { startDate: '21 September' },
    };
    renderWithApplicationContext(
      <MessageItem message={summaryMessages} setSummaryMessages={jest.fn()} />
    );

    const updateMessage = screen.queryByText('The time period starts on');

    expect(updateMessage).toBeFalsy();
  });
});
