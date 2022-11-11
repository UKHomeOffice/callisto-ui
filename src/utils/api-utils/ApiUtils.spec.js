import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { validateServiceErrors } from './ApiUtils';
import { focusErrors } from './ApiUtils';
import { renderWithTimecardContext } from '../../test/helpers/TimecardContext';
import Timecard from '../../pages/timecard/Timecard';
import EditShiftTimecard from '../../components/timecard/edit-shift-timecard/EditShiftTimecard';
import EditShiftHours from '../../components/timecard/edit-shift-hours/EditShiftHours';
import StartFinishTimeInput from '../../components/timecard/start-finish-time-input/StartFinishTimeInput';
import { ErrorSummary } from 'govuk-frontend';
import * as spy from './ApiUtils';

describe('ApiUtils', () => {
  let serviceError;
  const setServiceError = jest.fn((serviceErrorData) => {
    serviceError = serviceErrorData;
  });

  it('should set the service error to false when no error is thrown', async () => {
    serviceError = {
      hasError: true,
      recoverable: true,
    };
    const serviceFunction = () => {};
    validateServiceErrors(setServiceError, serviceFunction);

    await waitFor(() => {
      expect(setServiceError).toHaveBeenCalledWith({
        hasError: false,
      });
      expect(serviceError.hasError).toEqual(false);
    });
  });

  it('should set the service error and recoverable to true when an error is thrown', async () => {
    serviceError = {
      hasError: false,
    };
    const serviceFunction = () => {
      throw new Error();
    };
    validateServiceErrors(setServiceError, serviceFunction);

    await waitFor(() => {
      expect(setServiceError).toHaveBeenCalledWith({
        hasError: true,
        recoverable: true,
      });
      expect(serviceError.hasError).toEqual(true);
    });
  });

  it('should set the service error to true and set recoverable to what was provided', async () => {
    serviceError = {
      hasError: false,
    };
    const serviceFunction = () => {
      throw new Error();
    };
    validateServiceErrors(setServiceError, serviceFunction, () => {}, false);

    await waitFor(() => {
      expect(setServiceError).toHaveBeenCalledWith({
        hasError: true,
        recoverable: false,
      });
      expect(serviceError.hasError).toEqual(true);
      expect(serviceError.recoverable).toEqual(false);
    });
  });

  describe('handleCustomErrors', () => {
    it('should set the service error to false if handleCustomErrors returns true', async () => {
      serviceError = {
        hasError: true,
      };

      const serviceFunction = () => {
        throw new Error();
      };

      const handleCustomErrors = () => {
        return true;
      };

      validateServiceErrors(
        setServiceError,
        serviceFunction,
        handleCustomErrors
      );

      await waitFor(() => {
        expect(setServiceError).toHaveBeenCalledWith({
          hasError: false,
        });
        expect(serviceError.hasError).toEqual(false);
      });
    });

    it('should set the service error to true if handleCustomErrors returns false', async () => {
      serviceError = {
        hasError: false,
      };

      const serviceFunction = () => {
        throw new Error();
      };

      const handleCustomErrors = () => {
        return false;
      };

      validateServiceErrors(
        setServiceError,
        serviceFunction,
        handleCustomErrors
      );

      await waitFor(() => {
        expect(setServiceError).toHaveBeenCalledWith({
          hasError: true,
          recoverable: true,
        });
        expect(serviceError.hasError).toEqual(true);
      });
    });
    it('should set error message to scroll and have focus', async () => {
      window.HTMLElement.prototype.scrollIntoView = jest.fn();
      const focusErrorsSpy = jest.spyOn(spy, 'focusErrors');
      const testErrors = {
        test: { inputName: 'test', message: 'Date cannot be blank' },
        'test-day': { inputName: 'test-day', message: 'Enter a day' },
        'test-month': { inputName: 'test-month', message: 'Enter a month' },
        'test-year': { inputName: 'test-year', message: 'Enter a year' },
      };
      renderWithTimecardContext(
        <Timecard>
          <ErrorSummary
            errors={testErrors}
            keys={['test', 'test-day', 'test-month', 'test-year']}
          >
            <EditShiftTimecard>
              <EditShiftHours
                setShowEditShiftHours={jest.fn()}
                timeEntriesIndex={0}
                summaryErrors={jest.fn()}
              >
                <StartFinishTimeInput
                  updateErrorMessages={jest.fn()}
                ></StartFinishTimeInput>
              </EditShiftHours>
            </EditShiftTimecard>
          </ErrorSummary>
        </Timecard>,
        {
          summaryErrors: { testErrors },
          setSummaryErrors: jest.fn(),
          timeEntries: [
            {
              timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
              startTime: '2022-02-02T08:00:00Z',
              finishTime: '2022-02-02T16:00:00Z',
            },
          ],
          setTimeEntries: jest.fn(),
          timecardDate: '',
          setTimecardDate: jest.fn(),
          newTimeEntry: false,
        }
      );

      act(() => {
        const addButton = screen.getByTestId('hours-change-button');
        fireEvent.click(addButton);
        const startTimeInput = screen.getByTestId('shift-start-time');
        fireEvent.change(startTimeInput, {
          target: { value: '' },
        });
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
      });
      await waitFor(() => {
        expect(focusErrorsSpy).toBeCalled();
        expect(screen.getByText('There is a problem')).toBeTruthy();
      });
    });
  });
});
