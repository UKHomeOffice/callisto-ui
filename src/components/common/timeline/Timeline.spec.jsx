import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Timeline from './Timeline';

describe('Timeline', () => {
  it('should render a timeline with correct first entry', () => {
    render(
      <Timeline
        items={[
          {
            title: 'New note added',
            updatedBy: 'John Smith',
            dateTime: new Date('2022-04-08T15:45:00.000Z'),
            description: 'This is my new note',
          },
        ]}
      />
    );

    const title = screen.getByText('New note added');
    const updatedBy = screen.getByText('by John Smith');
    const dateTime = screen.getByText('08/04/2022', { exact: false });
    const description = screen.getByText('This is my new note');

    expect(title).toBeTruthy();
    expect(updatedBy).toBeTruthy();
    expect(dateTime).toBeTruthy();
    expect(description).toBeTruthy();
  });
});
