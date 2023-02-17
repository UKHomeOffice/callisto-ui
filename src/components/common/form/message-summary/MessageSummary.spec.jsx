import { screen } from '@testing-library/react';
import { renderWithTimecardContext } from '../../../../test/helpers/TimecardContext';

import MessageSummary from './MessageSummary';

describe('MessageSummary', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  it('should render a summary component with all messages details', () => {
    const testMessages = {
      delete: { inputName: 'delete', message: 'Row Deleted' },
      update: { inputName: 'update', message: 'Row Updated' },
      insert: { inputName: 'insert', message: 'Row Inserted' },
    };
    renderWithTimecardContext(
      <MessageSummary
        messages={testMessages}
        keys={['delete', 'update', 'insert']}
      />
    );

    const deleteMessage = screen.getByText('Row Deleted');
    const updateMessage = screen.getByText('Row Updated');
    const insertMessage = screen.getByText('Row Inserted');

    expect(deleteMessage).toBeTruthy();
    expect(updateMessage).toBeTruthy();
    expect(insertMessage).toBeTruthy();
  });
});
