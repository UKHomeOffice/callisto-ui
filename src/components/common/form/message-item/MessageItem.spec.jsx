import { screen } from '@testing-library/react';
import { renderWithTimecardContext } from '../../../../test/helpers/TimecardContext';
import MessageItem from './MessageItem';

describe('MessageItem', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  it('should render a summary component with a single date and messages details', () => {
    const summaryMessages = {
      update: {
        template: `datesMoved`,
        variables: { startDate: '2022-09-21' },
      },
    };
    renderWithTimecardContext(<MessageItem />, {
      summaryMessages: summaryMessages,
      setSummaryMessages: jest.fn(),
    });

    const updateMessage = screen.getByText('The time period starts on');

    expect(updateMessage).toBeTruthy();
  });

  it('should render a summary component with two dates and message details', () => {
    const summaryMessages = {
      update: {
        template: `datesMoved`,
        variables: { startDate: '2022-09-21', endDate: '2022-09-21' },
      },
    };
    renderWithTimecardContext(<MessageItem />, {
      summaryMessages: summaryMessages,
      setSummaryMessages: jest.fn(),
    });

    const updateMessage = screen.getByText(
      'The time period starts on and finishes on'
    );

    expect(updateMessage).toBeTruthy();
  });

  it('should not render a message if the key is not listed', async () => {
    const summaryMessages = {
      unknownKey: {
        template: `datesMoved`,
        variables: { startDate: '2022-09-21' },
      },
    };
    renderWithTimecardContext(<MessageItem />, {
      summaryMessages: summaryMessages,
      setSummaryMessages: jest.fn(),
    });

    const updateMessage = screen.queryByText('The time period starts on');

    expect(updateMessage).toBeFalsy();
  });
});
