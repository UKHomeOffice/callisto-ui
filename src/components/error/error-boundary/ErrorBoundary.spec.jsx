import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-test-renderer';
import { ApplicationContext } from '../../../context/ApplicationContext';
import { defaultApplicationContext } from '../../../test/helpers/TimecardContext';
import { ErrorBoundary } from './ErrorBoundary';
import PropTypes from 'prop-types';

describe('ErrorBoundary', () => {
  function TestApplication(props) {
    return (
      <ApplicationContext.Provider value={defaultApplicationContext}>
        <MemoryRouter>
          <ErrorBoundary fallback={<ErrorBoundary />}>
            {props.children}
          </ErrorBoundary>
        </MemoryRouter>
      </ApplicationContext.Provider>
    );
  }

  TestApplication.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
  };

  describe('Given there is an application error', () => {
    const originalWindowLocation = window.location;
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        configurable: true,
        value: {
          reload: jest.fn(),
          replace: jest.fn(),
        },
      });
    });

    afterEach(() => {
      Object.defineProperty(window, 'location', {
        configurable: true,
        value: originalWindowLocation,
      });
    });

    const renderApplicationError = () => {
      const ThrowError = () => {
        throw new Error('Test');
      };

      render(
        <TestApplication>
          <ThrowError />
          <div data-testid="test-div">test</div>
        </TestApplication>
      );
    };

    it('should render the application error component and not render the child components', () => {
      renderApplicationError();
      expect(
        screen.getByText('Sorry, there is a problem with the service')
      ).toBeTruthy();
      expect(screen.getByTestId('app-error-message').textContent).toContain(
        'Any unsaved changes will have been lost'
      );
      expect(screen.queryByTestId('test-div')).toBeNull();
    });

    it('refreshes the page when the refresh button is clicked', () => {
      renderApplicationError();
      act(() => {
        const refreshButton = screen.getByText('Refresh');
        fireEvent.click(refreshButton);
      });

      expect(window.location.reload).toHaveBeenCalled();
    });

    it('redirects to the previous page when the go back button is clicked', () => {
      const originalReferrer = document.referrer;
      const referrerValue = 'prev page';
      Object.defineProperty(document, 'referrer', {
        configurable: true,
        value: referrerValue,
      });

      renderApplicationError();
      act(() => {
        const goBackButton = screen.getByText('Go back');
        fireEvent.click(goBackButton);
      });

      expect(window.location.replace).toHaveBeenCalledWith(referrerValue);

      Object.defineProperty(document, 'referrer', {
        configurable: true,
        value: originalReferrer,
      });
    });
  });

  describe('Given there is a service error', () => {
    it('should render the service error component and the child components if the error is recoverable', () => {
      render(
        <TestApplication>
          {(defaultApplicationContext.serviceError.hasError = true)}
          <div data-testid="test-div">test</div>
        </TestApplication>
      );

      expect(
        screen.getByText('Sorry, there is a problem with the service')
      ).toBeTruthy();
      expect(screen.queryByTestId('app-error-message')).toBeNull();
      expect(screen.queryByTestId('test-div').textContent).toEqual('test');
    });

    it('should render the service error component and should not render the child components if the error is not recoverable', () => {
      render(
        <TestApplication>
          {
            (defaultApplicationContext.serviceError = {
              hasError: true,
              recoverable: false,
            })
          }
          <div data-testid="test-div">test</div>
        </TestApplication>
      );

      expect(screen.getByTestId('app-error-message').textContent).toContain(
        'Any unsaved changes will have been lost'
      );
      expect(screen.queryByTestId('test-div')).toBeNull();
    });
  });

  describe('Given there is no error', () => {
    it('should not render any error component and only render the child components', () => {
      render(
        <TestApplication>
          {(defaultApplicationContext.serviceError.hasError = false)}
          <div data-testid="test-div">test</div>
        </TestApplication>
      );

      expect(
        screen.queryByText('Sorry, there is a problem with the service')
      ).toBeFalsy();
      expect(screen.queryByTestId('app-error-message')).toBeNull();
      expect(screen.queryByTestId('test-div').textContent).toEqual('test');
    });
  });
});
