import { screen, waitFor } from '@testing-library/react';
import { timeCardPeriodTypes } from '../../../../mocks/mockData';
import TimecardEntriesList from './TimecardEntriesList';
import { renderWithApplicationContext } from '../../../test/helpers/TestApplicationContext';

describe('TimecardEntriesList', () => {
  it('should render the EditShift component when time period type is Shift', async () => {
    renderWithApplicationContext(
      <TimecardEntriesList
        summaryErrors={[]}
        setSummaryErrors={jest.fn()}
        timecardDate="2021-09-01"
        timeEntries={[
          {
            timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
            startTime: '',
            finishTime: '',
          },
        ]}
        setTimeEntries={jest.fn()}
        timePeriodTypes={timeCardPeriodTypes}
        summaryMessages={[]}
        setSummaryMessages={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.queryByText('Add a new time period')).toBeFalsy();
      expect(screen.getByText('Start time')).toBeTruthy();
      expect(screen.getByText('Finish time')).toBeTruthy();
      expect(screen.getByText('Time period')).toBeTruthy();
    });
  });

  test.each([
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000003',
  ])(
    'should show "Time period" title when any time period is selected',
    async (testValue) => {
      renderWithApplicationContext(
        <TimecardEntriesList
          summaryErrors={[]}
          setSummaryErrors={jest.fn()}
          timecardDate="2021-09-01"
          timeEntries={[
            {
              timePeriodTypeId: testValue,
              startTime: '',
              finishTime: '',
            },
          ]}
          setTimeEntries={jest.fn()}
          timePeriodTypes={timeCardPeriodTypes}
          summaryMessages={[]}
          setSummaryMessages={jest.fn()}
        />
      );

      await waitFor(() => {
        expect(screen.queryByText('Add a new time period')).toBeFalsy();
        timeCardPeriodTypes.forEach(() => {
          expect(screen.queryByText('Time period')).toBeTruthy();
        });
      });
    }
  );

  test.each([
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000003',
  ])(
    'should render the SimpleTimePeriod component when time period type is correct',
    async (testValue) => {
      renderWithApplicationContext(
        <TimecardEntriesList
          summaryErrors={[]}
          setSummaryErrors={jest.fn()}
          timecardDate="2021-09-01"
          timeEntries={[
            {
              timePeriodTypeId: testValue,
              startTime: '',
              finishTime: '',
            },
          ]}
          setTimeEntries={jest.fn()}
          timePeriodTypes={timeCardPeriodTypes}
          summaryMessages={[]}
          setSummaryMessages={jest.fn()}
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
