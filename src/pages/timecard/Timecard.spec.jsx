import { fireEvent, screen, waitFor } from '@testing-library/react';
import {
  defaultApplicationContext,
  renderWithTimecardContext,
  defaultTimecardContext,
} from '../../test/helpers/TimecardContext';
import { shiftTimeEntry, timeCardPeriodTypes } from '../../../mocks/mockData';
import Timecard from './Timecard';
import { getTimeEntries } from '../../api/services/timecardService';
import { addTimePeriodHeading } from '../../utils/time-entry-utils/timeEntryUtils';
import { getApiResponseWithItems } from '../../../mocks/mock-utils';

const date = '2022-07-01';
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    date: date,
  }),
  useNavigate: () => mockNavigate,
}));

const shiftTimeEntryApiResponse = getApiResponseWithItems(shiftTimeEntry);

jest.mock('../../api/services/timecardService');
beforeEach(() => {
  getTimeEntries.mockImplementation(() => {
    return {
      data: shiftTimeEntryApiResponse,
    };
  });
});

describe('Timecard', () => {
  it('should render a timecard component with the correct date', () => {
    renderWithTimecardContext(<Timecard />);

    const screenDate = screen.getByText('01 July 2022');
    expect(screenDate).toBeTruthy();
  });

  it('should render the SelectTimecardPeriodType component when no time entries have been added', () => {
    renderWithTimecardContext(<Timecard />);

    const heading = screen.getByText('Add time period');
    expect(heading).toBeTruthy();
  });

  it('should render the SelectTimecardPeriodType component when the last time period is removed', async () => {
    renderWithTimecardContext(<Timecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timeEntries: [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-09-01 01:00:00+00:00',
          finishTime: '2022-09-01 05:00:00+00:00',
        },
      ],
      setTimeEntries: jest.fn(),
      timecardDate: '',
      setTimecardDate: jest.fn(),
    });

    expect(screen.queryByText('Add a new time period')).toBeFalsy();
    expect(screen.getByText('Shift')).toBeTruthy();

    fireEvent.click(screen.getByText('Remove'));

    expect(screen.queryAllByTestId('radio-buttons')).toBeTruthy();
  });

  it('should render the EditShiftTimecard component when time period type is Shift', async () => {
    renderWithTimecardContext(<Timecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timeEntries: [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '',
          finishTime: '',
        },
      ],
      setTimeEntries: jest.fn(),
      timecardDate: '',
      setTimecardDate: jest.fn(),
    });

    expect(screen.queryByText('Add a new time period')).toBeFalsy();
    expect(screen.getByText('Start time')).toBeTruthy();
    expect(screen.getByText('Finish time')).toBeTruthy();
    expect(screen.getByText('Shift')).toBeTruthy();
  });

  test.each([
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000003',
  ])(
    'should render the SimpleTimePeriod component when time period type is correct',
    async (testValue) => {
      renderWithTimecardContext(<Timecard />, {
        summaryErrors: {},
        setSummaryErrors: jest.fn(),
        timeEntries: [
          {
            timePeriodTypeId: testValue,
            startTime: '',
            finishTime: '',
          },
        ],
        setTimeEntries: jest.fn(),
        timecardDate: '',
        setTimecardDate: jest.fn(),
      });

      await waitFor(() => {
        expect(screen.queryByText('Add a new time period')).toBeFalsy();
        timeCardPeriodTypes.forEach((type) => {
          if (type.id != testValue)
            expect(screen.queryByText(type.name)).toBeFalsy();
          else if (type.id === testValue)
            expect(screen.queryByText(type.name)).toBeTruthy();
        });
      });
    }
  );

  it('should set the time entries in the context if time entries exist for that date', async () => {
    renderWithTimecardContext(
      <Timecard />,
      defaultTimecardContext,
      defaultApplicationContext
    );

    await waitFor(() => {
      expect(defaultTimecardContext.setTimeEntries).toHaveBeenCalledWith([
        {
          timeEntryId: 'c0a80040-82cf-1986-8182-cfedbbd50003',
          startTime: shiftTimeEntryApiResponse.items[0].actualStartTime,
          finishTime: shiftTimeEntryApiResponse.items[0].actualEndTime,
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          finishNextDay: false,
        },
      ]);
      expect(defaultTimecardContext.setTimecardDate).toHaveBeenCalledWith(date);
      expect(defaultApplicationContext.setServiceError).toHaveBeenCalledWith({
        hasError: false,
      });
    });
  });

  it('should set the date and an empty time entries array in the context if time entries do not exist for that date', async () => {
    getTimeEntries.mockImplementation(() => {
      return {
        data: {
          meta: {},
          items: [],
        },
      };
    });

    const timeCardContextValues = defaultTimecardContext;
    timeCardContextValues['timeEntries'] = [{}, {}];

    renderWithTimecardContext(
      <Timecard />,
      timeCardContextValues,
      defaultApplicationContext
    );

    await waitFor(() => {
      expect(timeCardContextValues.setTimeEntries).toHaveBeenCalledWith([]);
      expect(timeCardContextValues.setTimecardDate).toHaveBeenCalledWith(date);
      expect(defaultApplicationContext.setServiceError).toHaveBeenCalledWith({
        hasError: false,
      });
    });
  });

  it('should display an error banner when getting time entries throws an error', async () => {
    getTimeEntries.mockImplementation(() => {
      throw Error();
    });

    renderWithTimecardContext(
      <Timecard />,
      defaultTimecardContext,
      defaultApplicationContext
    );

    await waitFor(() => {
      expect(defaultApplicationContext.setServiceError).toHaveBeenCalledWith({
        hasError: true,
        recoverable: false,
      });
    });
  });

  it('should display error summary messages when summary errors exist', async () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    renderWithTimecardContext(<Timecard />, {
      summaryErrors: {
        timePeriod: {
          message: 'You must select a time period',
        },
      },
      setSummaryErrors: jest.fn(),
      timeEntries: [
        {
          startTime: '',
          finishTime: '',
        },
      ],
      setTimeEntries: jest.fn(),
      timecardDate: '',
      setTimecardDate: jest.fn(),
    });

    expect(screen.getByText('There is a problem')).toBeTruthy();
    expect(screen.getByText('You must select a time period')).toBeTruthy();
  });

  it('should render the SelectTimecardPeriodType component if newTimeEntry is true have been added', () => {
    renderWithTimecardContext(<Timecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timeEntries: [],
      setTimeEntries: jest.fn(),
      timecardDate: '',
      setTimecardDate: jest.fn(),
      newTimeEntry: true,
    });

    const heading = screen.getByText(addTimePeriodHeading);
    expect(heading).toBeTruthy();
  });

  it('should render the "Edit Shift" component for existing time entry', () => {
    renderWithTimecardContext(<Timecard />, {
      summaryErrors: {},
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
    });

    expect(screen.getByText('08:00 to 16:00')).toBeInTheDocument();
    expect(screen.getByText(addTimePeriodHeading)).toBeInTheDocument();
  });

  it('should not display notification messages when they havent been raised', async () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    renderWithTimecardContext(<Timecard />, {
      summaryMessages: {},

      setSummaryMessages: jest.fn(),
      isAlertVisible: false,
      setIsAlertVisible: jest.fn(),

      timeEntries: [
        {
          startTime: '',
          finishTime: '',
        },
      ],
      setTimeEntries: jest.fn(),
      timecardDate: '',
      setTimecardDate: jest.fn(),
    });

    expect(screen.queryByText('Row Deleted')).toBeFalsy();
  });

  it('should display notification messages when they exist', async () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    renderWithTimecardContext(<Timecard />, {
      summaryMessages: {
        update: {
          template: `datesMoved`,
          variables: { startDate: '2022-09-21' },
        },
      },

      setSummaryMessages: jest.fn(),
      isAlertVisible: true,
      setIsAlertVisible: jest.fn(),

      timeEntries: [
        {
          startTime: '',
          finishTime: '',
        },
      ],
      setTimeEntries: jest.fn(),
      timecardDate: '',
      setTimecardDate: jest.fn(),
    });

    expect(screen.getByText('The time period starts on')).toBeTruthy();
  });

  describe('navigation', () => {
    it('should contain a link to previous day', () => {
      renderWithTimecardContext(<Timecard />);

      const previousDayLink = screen.getByRole('link', {
        name: 'Previous day',
      });
      expect(previousDayLink.pathname).toBe('/timecard/2022-06-30');
      fireEvent.click(previousDayLink);
    });

    it('should contain a link to next day', () => {
      renderWithTimecardContext(<Timecard />);

      const nextDayLink = screen.getByRole('link', { name: 'Next day' });
      expect(nextDayLink.pathname).toBe('/timecard/2022-07-02');
      fireEvent.click(nextDayLink);
    });

    it('should contain a link to the calendar', () => {
      renderWithTimecardContext(<Timecard />);

      const calendarLink = screen.getByRole('link', {
        name: 'Select another date',
      });
      expect(calendarLink.pathname).toBe('/calendar');
    });
  });
});
