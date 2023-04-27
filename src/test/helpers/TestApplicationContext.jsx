import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ApplicationContext } from '../../context/ApplicationContext';

export const renderWithApplicationContext = (
  Component,
  applicationContextValues = defaultApplicationContext
) => {
  return {
    ...render(
      <ApplicationContext.Provider value={applicationContextValues}>
        <MemoryRouter>{Component}</MemoryRouter>
      </ApplicationContext.Provider>
    ),
  };
};

export const defaultApplicationContext = {
  serviceError: {
    hasError: false,
  },
  setServiceError: jest.fn(),
  userId: 'c6ede784-b5fc-4c95-b550-2c51cc72f1f6',
  setUserId: jest.fn(),
};
