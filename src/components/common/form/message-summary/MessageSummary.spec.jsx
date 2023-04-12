/* eslint-disable prettier/prettier */
import { screen } from '@testing-library/react';
import MessageSummary from './MessageSummary';
import { renderWithApplicationContext } from '../../../../test/helpers/TestApplicationContext';

describe('MessageSummary', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  it('should render a summary component with all messages details', () => {
    const summaryMessages = [
      {
        key: 'datesMoved',
        template: `DatesMoved`,
        variables: { startDate: '21 September' },
      },
    ];
    renderWithApplicationContext(
      <MessageSummary
        summaryMessages={summaryMessages}
        setSummaryMessages={jest.fn()}
      />
    );

    const updateMessage = screen.getByText('The time period starts on');

    expect(updateMessage).toBeTruthy();
  });

  // it('should handle multiple messages being passed in but only render valid requests', () => {
  //   const summaryMessages = [
  //     {
  //       key: 'datesMoved',
  //       template: `DatesMoved`,
  //       variables: { startDate: '2022-09-21' },
  //     },
  //     {
  //       key: 'datesMoved',
  //       template: `InsertTemplate`,
  //       variables: { updateInfo: 'Record Updated' },
  //     },
  //   ];
  //   renderWithApplicationContext(<MessageSummary summaryMessages={summaryMessages}
  //     setSummaryMessages={jest.fn()} />);

  //   const updateMessage = screen.getByText('The time period starts on');
  //   const insertMessage = screen.queryByText('Record Updated');

  //   expect(updateMessage).toBeTruthy();
  //   expect(insertMessage).toBeFalsy();
  // });
});
