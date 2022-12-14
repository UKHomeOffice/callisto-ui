import { render, screen } from '@testing-library/react';
import Timeline from './Timeline';

describe('Timeline', () => {
  it('should render a timeline with correct first entry', () => {
    render(
      <Timeline
        items={[
          {
            title: 'New note added',
            updatedBy: 'John Smith',
            dateTime: '2022-04-08T15:45:00.000Z',
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

  it('should render a timeline with correct second entry', () => {
    render(
      <Timeline
        items={[
          {
            title: 'New note added',
            updatedBy: 'John Smith',
            dateTime: '2022-04-08T15:45:00.000Z',
            description: 'This is my new note',
          },
          {
            title: 'Second note added',
            updatedBy: 'Jane Doe',
            dateTime: '2022-04-10T15:45:00.000Z',
            description: 'Adding another note',
          },
        ]}
      />
    );

    const title = screen.getByText('Second note added');
    const updatedBy = screen.getByText('by Jane Doe');
    const dateTime = screen.getByText('10/04/2022', { exact: false });
    const description = screen.getByText('Adding another note');

    expect(title).toBeTruthy();
    expect(updatedBy).toBeTruthy();
    expect(dateTime).toBeTruthy();
    expect(description).toBeTruthy();
  });

  it('should render a timeline entry without a description', () => {
    render(
      <Timeline
        items={[
          {
            title: 'Created',
            updatedBy: 'John Smith',
            dateTime: '2022-04-01T15:45:00.000Z',
          },
        ]}
      />
    );

    const title = screen.getByText('Created');
    const updatedBy = screen.getByText('by John Smith');
    const dateTime = screen.getByText('01/04/2022', { exact: false });
    const description = screen.queryByTestId('description');

    expect(title).toBeTruthy();
    expect(updatedBy).toBeTruthy();
    expect(dateTime).toBeTruthy();
    expect(description).toBeFalsy();
  });
});
