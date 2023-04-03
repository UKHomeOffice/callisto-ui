import { fireEvent, screen, waitFor } from '@testing-library/react';
import {
  shiftTimeEntry,
  timeCardPeriodTypes,
  shiftTimeEntryMultipleDays,
  shiftTimeEntryPreviousDayNoEndTime,
  shiftTimeEntryTodayNoEndTime,
  shiftTimeCardPeriodType,
} from '../../../mocks/mockData';
import Timecard from './Timecard';
import { getTimeEntries } from '../../api/services/timecardService';
import { addTimePeriodHeading } from '../../utils/time-entry-utils/timeEntryUtils';
import { getApiResponseWithItems } from '../../../mocks/mock-utils';
import {
  renderWithApplicationContext,
  defaultApplicationContext,
} from '../../test/helpers/TestApplicationContext';
import { getTimePeriodTypes } from '../../api/services/timecardService';

let mockDate;
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    date: mockDate,
  }),
  useNavigate: () => mockNavigate,
}));

const multipleDayShiftTimeEntryApiResponse = getApiResponseWithItems(
  shiftTimeEntryMultipleDays
);

const twoShiftsNoEndDate = getApiResponseWithItems(
  shiftTimeEntryPreviousDayNoEndTime,
  shiftTimeEntryTodayNoEndTime
);

const shiftTimeEntryApiResponse = getApiResponseWithItems(shiftTimeEntry);

jest.mock('../../api/services/timecardService');
beforeEach(() => {
  mockDate = '2022-07-01';

  getTimeEntries.mockImplementation(() => {
    return {
      data: shiftTimeEntryApiResponse,
    };
  });
  getTimePeriodTypes.mockImplementation(() => {
    return {
      data: shiftTimeCardPeriodType,
    };
  });
});

const setTimeEntrySpy = jest.fn();

describe('Shift spanning mutiple days', () => {
  it('should call setTimeEntries when time entry begins at midnight', async () => {
    mockDate = '2022-01-30';
    getTimeEntries.mockImplementation(() => {
      return {
        data: multipleDayShiftTimeEntryApiResponse,
      };
    });

    renderWithApplicationContext(<Timecard timecardDate={mockDate} />);

    await waitFor(() => {
      expect(screen.getByText('00:00 to 00:00 on 02 February')).toBeTruthy();
    });
  });

  it('should call setTimeEntries when time entry spans over timecard date', async () => {
    mockDate = '2022-01-31';
    getTimeEntries.mockImplementation(() => {
      return {
        data: multipleDayShiftTimeEntryApiResponse,
      };
    });

    renderWithApplicationContext(<Timecard timecardDate={mockDate} />);

    await waitFor(() => {
      expect(screen.getByText('00:00 to 00:00 on 02 February')).toBeTruthy();
    });
  });

  it('should call setTimeEntries when time entry ends at midnight that night', async () => {
    mockDate = '2022-02-01';
    getTimeEntries.mockImplementation(() => {
      return {
        data: multipleDayShiftTimeEntryApiResponse,
      };
    });

    renderWithApplicationContext(<Timecard timecardDate={mockDate} />);

    await waitFor(() => {
      expect(screen.getByText('00:00 to 00:00 on 02 February')).toBeTruthy();
    });
  });

  it('should call setTimeEntries with the correct timeEntries when two shifts end with no end date and one is on the day before', async () => {
    mockDate = '2022-02-01';
    getTimeEntries.mockImplementation(() => {
      return {
        data: twoShiftsNoEndDate,
      };
    });

    renderWithApplicationContext(<Timecard timecardDate={mockDate} />);

    await waitFor(() => {
      expect(screen.getByText('09:00 to -')).toBeTruthy();
    });
  });

  it('should not call setTimeEntries when time entry ended at midnight last night', async () => {
    mockDate = '2022-02-02';
    getTimeEntries.mockImplementation(() => {
      return {
        data: multipleDayShiftTimeEntryApiResponse,
      };
    });

    renderWithApplicationContext(
      <Timecard setTimeEntries={setTimeEntrySpy} timecardDate={mockDate} />
    );

    await waitFor(() => {
      expect(setTimeEntrySpy).not.toHaveBeenCalledWith([
        {
          timeEntryId: 'c0a80040-82cf-1986-8182-cfedbbd50005',
          startTime: '2022-01-30T00:00:00+00:00',
          finishTime: '2022-02-02T00:00:00+00:00',
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          finishNextDay: true,
        },
      ]);
    });
  });
});

describe('Timecard', () => {
  it('should render a timecard component with the correct date', async () => {
    renderWithApplicationContext(<Timecard />);

    await waitFor(() => {
      const screenDate = screen.getByText('01 July 2022');
      expect(screenDate).toBeTruthy();
    });
  });

  it('should render the SelectTimecardPeriodType component when no time entries have been added', async () => {
    renderWithApplicationContext(<Timecard />);

    await waitFor(() => {
      const heading = screen.getByText('Add time period');
      expect(heading).toBeTruthy();
    });
  });

  it('should render the SelectTimecardPeriodType component when the last time period is removed', async () => {
    renderWithApplicationContext(<Timecard />);

    await waitFor(() => {
      expect(screen.queryByText('Add a new time period')).toBeFalsy();
      expect(screen.getByText('Shift')).toBeTruthy();

      fireEvent.click(screen.getByText('Remove'));

      expect(screen.queryAllByTestId('radio-buttons')).toBeTruthy();
    });
  });

  // it('should set the time entries in the context if time entries exist for that date', async () => {
  //   renderWithApplicationContext(
  //     <Timecard setTimeEntries={setTimeEntrySpy} timecardDate={mockDate} />
  //   );

  //   await waitFor(() => {
  //     expect(setTimeEntrySpy).toHaveBeenCalledWith([
  //       {
  //         timeEntryId: 'c0a80040-82cf-1986-8182-cfedbbd50003',
  //         startTime: shiftTimeEntryApiResponse.items[0].actualStartTime,
  //         finishTime: shiftTimeEntryApiResponse.items[0].actualEndTime,
  //         timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
  //         finishNextDay: false,
  //       },
  //     ]);
  //     expect(setTimecardDate).toHaveBeenCalledWith(mockDate);
  //     expect(defaultApplicationContext.setServiceError).toHaveBeenCalledWith({
  //       hasError: false,
  //     });
  //   });
  // });

  // it('should set the date and an empty time entries array in the context if time entries do not exist for that date', async () => {
  //   getTimeEntries.mockImplementation(() => {
  //     return {
  //       data: {
  //         meta: {},
  //         items: [],
  //       },
  //     };
  //   });

  //   const timeCardContextValues = defaultTimecardContext;
  //   timeCardContextValues['timeEntries'] = [{}, {}];

  //   renderWithTimecardContext(
  //     <Timecard />,
  //     timeCardContextValues,
  //     defaultApplicationContext
  //   );

  //   await waitFor(() => {
  //     expect(timeCardContextValues.setTimeEntries).toHaveBeenCalledWith([]);
  //     expect(timeCardContextValues.setTimecardDate).toHaveBeenCalledWith(
  //       mockDate
  //     );
  //     expect(defaultApplicationContext.setServiceError).toHaveBeenCalledWith({
  //       hasError: false,
  //     });
  //   });
  // });

  it('should display an error banner when getting time entries throws an error', async () => {
    getTimeEntries.mockImplementation(() => {
      throw Error();
    });

    renderWithApplicationContext(
      <Timecard setTimeEntries={setTimeEntrySpy} timecardDate={mockDate} />,
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

    const errors = [
      {
        key: 'radioName',
        inputName: 'timePeriod',
        message: 'You must select a time period',
        errorPriority: 1,
      },
    ];

    (<Timecard setTimeEntries={setTimeEntrySpy} timecardDate={mockDate} />),
      {
        summaryErrors: errors,
        setSummaryErrors: jest.fn(),
      };

    await waitFor(() => {
      expect(screen.getByText('There is a problem')).toBeTruthy();
      expect(screen.getByText('You must select a time period')).toBeTruthy();
    });
  });

  it('should render the SelectTimecardPeriodType component if newTimeEntry is true have been added', async () => {
    renderWithApplicationContext(<Timecard timecardDate={mockDate} />);

    await waitFor(() => {
      const heading = screen.getByText(addTimePeriodHeading);
      expect(heading).toBeTruthy();
    });
  });

  it('should render the "Edit Shift" component for existing time entry', async () => {
    getTimeEntries.mockImplementation(() => {
      return {
        data: [
          {
            timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
            startTime: '2022-02-02T08:00:00Z',
            finishTime: '2022-02-02T16:00:00Z',
          },
        ],
      };
    });

    renderWithApplicationContext(<Timecard timecardDate={mockDate} />);

    await waitFor(() => {
      expect(screen.getByText('08:00 to 16:00')).toBeInTheDocument();
      expect(screen.getByText(addTimePeriodHeading)).toBeInTheDocument();
    });
  });

  it('should not display notification messages when they havent been raised', async () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    renderWithApplicationContext(<Timecard />);

    expect(screen.queryByText('Row Deleted')).toBeFalsy();
  });

  // it('should display notification messages when they exist', async () => {
  //   window.HTMLElement.prototype.scrollIntoView = jest.fn();
  //   it('should render a summary component with all messages details', () => {
  //     const summaryMessages = [
  //       {
  //         key: 'datesMoved',
  //         template: `DatesMoved`,
  //         variables: { startDate: '21 September' },
  //       },
  //     ];

  //   renderWithApplicationContext(<Timecard />, {
  //     summaryMessages: summaryMessages,
  //     setSummaryMessages: jest.fn(),
  //   });

  //   expect(screen.getByText('The time period starts on')).toBeTruthy();
  // });

  describe('navigation', () => {
    it('should contain a link to previous day', () => {
      renderWithApplicationContext(<Timecard />);

      const previousDayLink = screen.getByRole('link', {
        name: 'Previous day',
      });
      expect(previousDayLink.pathname).toBe('/timecard/2022-06-30');
      fireEvent.click(previousDayLink);
    });

    it('should contain a link to next day', () => {
      renderWithApplicationContext(<Timecard />);

      const nextDayLink = screen.getByRole('link', { name: 'Next day' });
      expect(nextDayLink.pathname).toBe('/timecard/2022-07-02');
      fireEvent.click(nextDayLink);
    });

    it('should contain a link to the calendar', () => {
      renderWithApplicationContext(<Timecard />);

      const calendarLink = screen.getByRole('link', {
        name: 'Select another date',
      });
      expect(calendarLink.pathname).toBe('/calendar');
    });

    it('should clear message summary when navigating from page', () => {
      renderWithApplicationContext(<Timecard timecardDate={mockDate} />, {
        setTimeEntries: setTimeEntrySpy,
        defaultApplicationContext,
      });

      const nextDayLink = screen.getByRole('link', { name: 'Next day' });
      expect(nextDayLink.pathname).toBe('/timecard/2022-07-02');
      fireEvent.click(nextDayLink);

      expect(setTimeEntrySpy).toHaveBeenCalledWith([]);
    });
  });
});
