import { screen, waitFor } from '@testing-library/react';
import { renderWithTimecardContext } from '../../test/helpers/TimecardContext';
import { newTimeCardEntry } from '../../../mocks/mockData';
import Timecard from './Timecard';
import { getTimeEntries } from '../../api/services/timecardService';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    date: '2022-07-01',
  }),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../api/services/timecardService');
beforeEach(() => {
  getTimeEntries.mockImplementation(() => {
    return {
      data: newTimeCardEntry,
    };
  });
});

describe('Timecard', () => {
  it('should render a timecard component with the correct date', () => {
    renderWithTimecardContext(<Timecard />);

    const date = screen.getByText('01 July 2022');
    expect(date).toBeTruthy();
  });

  it('should render the SelectTimecardPeriodType component when no time entries have been added', () => {
    renderWithTimecardContext(<Timecard />);

    const heading = screen.getByText('Add a new time period');
    expect(heading).toBeTruthy();
  });

  it('should render the EditShiftTimecard component when time entry id exists', async () => {
    renderWithTimecardContext(<Timecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timecardData: {
        timeEntryId: '1',
        timePeriodType: 'Shift',
        startTime: '',
        finishTime: '',
      },
      setTimecardData: jest.fn(),
    });

    expect(screen.queryByText('Add a new time period')).toBeFalsy();
    expect(screen.getByText('Start time')).toBeTruthy();
    expect(screen.getByText('Finish time')).toBeTruthy();
  });

  it('should render the EditShiftTimecard component when time period type exists', async () => {
    renderWithTimecardContext(<Timecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timecardData: {
        timePeriodType: 'Shift',
        startTime: '',
        finishTime: '',
      },
      setTimecardData: jest.fn(),
    });

    expect(screen.queryByText('Add a new time period')).toBeFalsy();
    expect(screen.getByText('Start time')).toBeTruthy();
    expect(screen.getByText('Finish time')).toBeTruthy();
  });

  it('should set the timecard context if time entry exists', async () => {
    const setTimecardDataSpy = jest.fn();

    renderWithTimecardContext(<Timecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timecardData: {
        timeEntryId: '',
        timePeriodType: '',
        startTime: '',
        finishTime: '',
      },
      setTimecardData: setTimecardDataSpy,
    });

    await waitFor(() => {
      expect(setTimecardDataSpy).toHaveBeenCalledWith({
        timeEntryId: 'c0a80040-82cf-1986-8182-cfedbbd50003',
        startDate: '2022-08-24',
        startTime: '12:01',
        finishTime: '22:01',
        timePeriodType: '',
        timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
      });
    });
  });

  it('should set the timecard context for only the date if time entry does not exist', async () => {
    getTimeEntries.mockImplementation(() => {
      return {
        data: {
          meta: {},
          items: [],
        },
      };
    });

    const setTimecardDataSpy = jest.fn();

    renderWithTimecardContext(<Timecard />, {
      summaryErrors: {},
      setSummaryErrors: jest.fn(),
      timecardData: {
        timeEntryId: '',
        timePeriodType: '',
        startDate: '',
        startTime: '',
        finishTime: '',
      },
      setTimecardData: setTimecardDataSpy,
    });

    await waitFor(() => {
      expect(setTimecardDataSpy).toHaveBeenCalledWith({
        timeEntryId: '',
        startDate: '2022-07-01T00:00:00+00:00',
        finishTime: '',
        startTime: '',
        timePeriodType: '',
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
      timecardData: {
        timePeriodType: '',
        startTime: '',
        finishTime: '',
      },
      setTimecardData: jest.fn(),
    });

    expect(screen.getByText('There is a problem')).toBeTruthy();
    expect(screen.getByText('You must select a time period')).toBeTruthy();
  });

  describe('navigation', () => {
    it('should contain a link to previous day', () => {
      renderWithTimecardContext(<Timecard />);

      const previousDayLink = screen.getByText('Previous day');
      expect(previousDayLink.pathname).toBe('/timecard/2022-06-30');
    });

    it('should contain a link to next day', () => {
      renderWithTimecardContext(<Timecard />);

      const nextDayLink = screen.getByText('Next day');
      expect(nextDayLink.pathname).toBe('/timecard/2022-07-02');
    });

    it('should contain a link to the calendar', () => {
      renderWithTimecardContext(<Timecard />);

      const calendarLink = screen.getByText('Select another date');
      expect(calendarLink.pathname).toBe('/calendar');
    });
  });
});
