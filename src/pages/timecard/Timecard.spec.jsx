import { screen, waitFor } from '@testing-library/react';
import { renderWithTimecardContext } from '../../test/helpers/TimecardContext';
import { shiftTimeEntry } from '../../../mocks/mockData';
import Timecard from './Timecard';
import { getTimeEntries } from '../../api/services/timecardService';
import { formatTime } from '../../utils/time-entry-utils/timeEntryUtils';
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

  it('should render the SimpleTimePeriod component when time period type is SRD', async () => {
    renderWithTimecardContext(<Timecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timeEntries: [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
          startTime: '',
          finishTime: '',
        },
      ],
      setTimeEntries: jest.fn(),
      timecardDate: '',
      setTimecardDate: jest.fn(),
    });

    expect(screen.queryByText('Add a new time period')).toBeFalsy();
    expect(screen.queryByText('Shift')).toBeFalsy();
    expect(screen.queryByText('Non-working day')).toBeFalsy();
    expect(screen.getByText('Scheduled rest day')).toBeTruthy();
  });

  it('should render the SimpleTimePeriod component when time period type is NWD', async () => {
    renderWithTimecardContext(<Timecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timeEntries: [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000003',
          startTime: '',
          finishTime: '',
        },
      ],
      setTimeEntries: jest.fn(),
      timecardDate: '',
      setTimecardDate: jest.fn(),
    });

    expect(screen.queryByText('Add a new time period')).toBeFalsy();
    expect(screen.queryByText('Shift')).toBeFalsy();
    expect(screen.queryByText('Scheduled rest day')).toBeFalsy();
    expect(screen.getByText('Non-working day')).toBeTruthy();
  });

  it('should set the time entries in the context if time entries exist for that date', async () => {
    const setTimeEntriesSpy = jest.fn();
    const setTimecardDateSpy = jest.fn();

    renderWithTimecardContext(<Timecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timeEntries: [],
      setTimeEntries: setTimeEntriesSpy,
      timecardDate: '',
      setTimecardDate: setTimecardDateSpy,
    });

    await waitFor(() => {
      expect(setTimeEntriesSpy).toHaveBeenCalledWith([
        {
          timeEntryId: 'c0a80040-82cf-1986-8182-cfedbbd50003',
          startTime: formatTime(
            shiftTimeEntryApiResponse.items[0].actualStartTime
          ),
          finishTime: formatTime(
            shiftTimeEntryApiResponse.items[0].actualEndTime
          ),
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
        },
      ]);
      expect(setTimecardDateSpy).toHaveBeenCalledWith(date);
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

    const setTimeEntriesSpy = jest.fn();
    const setTimecardDateSpy = jest.fn();

    renderWithTimecardContext(<Timecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timeEntries: [{}, {}],
      setTimeEntries: setTimeEntriesSpy,
      timecardDate: '',
      setTimecardDate: setTimecardDateSpy,
    });

    await waitFor(() => {
      expect(setTimeEntriesSpy).toHaveBeenCalledWith([]);
      expect(setTimecardDateSpy).toHaveBeenCalledWith(date);
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

    const heading = screen.getByText('Add a new time period');
    expect(heading).toBeTruthy();
  });

  it('should render the "Edit Shift" component for existing time entry', () => {
    renderWithTimecardContext(<Timecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timeEntries: [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '08:00',
          finishTime: '16:00',
        },
      ],
      setTimeEntries: jest.fn(),
      timecardDate: '',
      setTimecardDate: jest.fn(),
      newTimeEntry: false,
    });

    expect(screen.getByText('08:00 to 16:00')).toBeInTheDocument();
    expect(screen.getByText('Add another time period')).toBeInTheDocument();
    expect(
      screen.getByText('Use this to record overtime or another shift')
    ).toBeInTheDocument();
  });

  describe('navigation', () => {
    it('should contain a link to previous day', () => {
      renderWithTimecardContext(<Timecard />);

      const previousDayLink = screen.getByRole('link', {
        name: 'Previous day',
      });
      expect(previousDayLink.pathname).toBe('/timecard/2022-06-30');
    });

    it('should contain a link to next day', () => {
      renderWithTimecardContext(<Timecard />);

      const nextDayLink = screen.getByRole('link', { name: 'Next day' });
      expect(nextDayLink.pathname).toBe('/timecard/2022-07-02');
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
