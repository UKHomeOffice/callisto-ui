import { screen } from '@testing-library/react';
import { renderWithTimecardContext } from '../../../../test/helpers/TimecardContext';
import MessageSummary from './MessageSummary';
import { messageKeys } from '../../../../utils/constants';

describe('MessageSummary', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  it('should render a summary component with all messages details', () => {
    const summaryMessages = {
      update: {
        template: `datesMoved`,
        variables: { startDate: '2022-09-21' },
      },
    };
    renderWithTimecardContext(<MessageSummary keys={[messageKeys.update]} />, {
      summaryMessages: summaryMessages,
      setSummaryMessages: jest.fn(),
      setIsAlertVisible: jest.fn(),
    });

    const updateMessage = screen.getByText('The time period starts on');

    expect(updateMessage).toBeTruthy();
  });

  it('should handle multiple messages being passed in but only render valid requests', () => {
    const summaryMessages = {
      update: {
        template: `datesMoved`,
        variables: { startDate: '2022-09-21' },
      },
      insert: {
        template: `insertTemplate`,
        variables: { updateInfo: 'Record Updated' },
      },
    };
    renderWithTimecardContext(<MessageSummary keys={[messageKeys.update]} />, {
      summaryMessages: summaryMessages,
      setSummaryMessages: jest.fn(),
      setIsAlertVisible: jest.fn(),
    });

    const updateMessage = screen.getByText('The time period starts on');
    const insertMessage = screen.queryByText('Record Updated');

    expect(updateMessage).toBeTruthy();
    expect(insertMessage).toBeFalsy();
  });
});
