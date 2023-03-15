import { screen, waitFor } from '@testing-library/react';
import { renderWithTimecardContext } from '../../../test/helpers/TimecardContext';
import {
  shiftTimeEntry,
  timeCardPeriodTypes,
} from '../../../../mocks/mockData';
import TimecardEntriesList from './TimecardEntriesList';
import { getTimeEntries } from '../../../api/services/timecardService';
import { getApiResponseWithItems } from '../../../../mocks/mock-utils';
import { getTimePeriodTypes } from '../../../api/services/timecardService';

// const shiftTimeEntryApiResponse = getApiResponseWithItems(shiftTimeEntry);

// beforeEach(() => {
//   getTimeEntries.mockImplementation(() => {
//     return {
//       data: shiftTimeEntryApiResponse,
//     };
//   });
// });

describe('TimecardEntriesList', () => {
  // it('should render a timecard component with the correct date', () => {
  //   renderWithTimecardContext(<TimecardEntriesList />);

  //   const screenDate = screen.getByText('01 July 2022');
  //   expect(screenDate).toBeTruthy();
  // });

  it('should render the EditShiftTimecard component when time period type is Shift', async () => {
    renderWithTimecardContext(
      <TimecardEntriesList
        timeEntries={[
          {
            timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
            startTime: '',
            finishTime: '',
          },
        ]}
        timePeriodTypes={timeCardPeriodTypes}
        hasShiftMovedCallback={jest.fn()}
      />
    );

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
      renderWithTimecardContext(
        <TimecardEntriesList
          timeEntries={[
            {
              timePeriodTypeId: testValue,
              startTime: '',
              finishTime: '',
            },
          ]}
          timePeriodTypes={timeCardPeriodTypes}
          hasShiftMovedCallback={jest.fn()}
        />
      );

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
});
