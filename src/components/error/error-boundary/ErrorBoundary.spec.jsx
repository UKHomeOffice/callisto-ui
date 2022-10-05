import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { ApplicationContext } from '../../../context/ApplicationContext';
import { defaultApplicationContext } from '../../../test/helpers/TimecardContext';
import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
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
        <ApplicationContext.Provider value={defaultApplicationContext}>
          <ErrorBoundary fallback={<ErrorBoundary />}>
            <ThrowError />
            <div data-testid="test-div">test</div>
          </ErrorBoundary>
        </ApplicationContext.Provider>
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
        <ApplicationContext.Provider value={defaultApplicationContext}>
          <ErrorBoundary fallback={<ErrorBoundary />}>
            {(defaultApplicationContext.serviceError.hasError = true)}
            <div data-testid="test-div">test</div>
          </ErrorBoundary>
        </ApplicationContext.Provider>
      );

      expect(
        screen.getByText('Sorry, there is a problem with the service')
      ).toBeTruthy();
      expect(screen.queryByTestId('app-error-message')).toBeNull();
      expect(screen.queryByTestId('test-div').textContent).toEqual('test');
    });

    it('should render the service error component and should not render the child components if the error is not recoverable', () => {
      render(
        <ApplicationContext.Provider value={defaultApplicationContext}>
          <ErrorBoundary fallback={<ErrorBoundary />}>
            {
              (defaultApplicationContext.serviceError = {
                hasError: true,
                recoverable: false,
              })
            }
            <div data-testid="test-div">test</div>
          </ErrorBoundary>
        </ApplicationContext.Provider>
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
        <ApplicationContext.Provider value={defaultApplicationContext}>
          <ErrorBoundary fallback={<ErrorBoundary />}>
            {(defaultApplicationContext.serviceError.hasError = false)}
            <div data-testid="test-div">test</div>
          </ErrorBoundary>
        </ApplicationContext.Provider>
      );

      expect(
        screen.queryByText('Sorry, there is a problem with the service')
      ).toBeFalsy();
      expect(screen.queryByTestId('app-error-message')).toBeNull();
      expect(screen.queryByTestId('test-div').textContent).toEqual('test');
    });
  });
});
