import { getNodeText, screen } from '@testing-library/react';
import { renderWithApplicationContext } from '../../../test/helpers/TestApplicationContext';
import { clashingProperties } from '../../../utils/constants';
import TimeInputErrors from './TimeInputErrors';
import { timePeriodTypesMap } from '../../../../mocks/mockData';

describe('TimeInputErrors', () => {
  const singleShiftClash = [
    {
      timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
      startTime: '2022-11-03T08:00:00.000+00:00',
      endTime: '2022-11-03T12:00:00.000+00:00',
    },
  ];

  describe('Clashing properties', () => {
    it('should display a single error for start time clash', () => {
      renderWithApplicationContext(
        <TimeInputErrors
          clashingProperty={clashingProperties.startTime}
          clashes={singleShiftClash}
          timePeriodTypesMap={timePeriodTypesMap}
        />
      );

      const clashingShiftError = screen.getByText(
        'Your start time must not overlap with another time period'
      );
      expect(clashingShiftError).toBeTruthy();
    });

    it('should display a single error for finish time clash', () => {
      renderWithApplicationContext(
        <TimeInputErrors
          clashingProperty={clashingProperties.endTime}
          clashes={singleShiftClash}
          timePeriodTypesMap={timePeriodTypesMap}
        />
      );

      const clashingShiftError = screen.getByText(
        'Your finish time must not overlap with another time period'
      );
      expect(clashingShiftError).toBeTruthy();
    });

    it('should display a single error for start and finish time clash', () => {
      renderWithApplicationContext(
        <TimeInputErrors
          clashingProperty={clashingProperties.startAndEndTime}
          clashes={singleShiftClash}
          timePeriodTypesMap={timePeriodTypesMap}
        />
      );

      const clashingShiftError = screen.getByText(
        'Your start and finish times must not overlap with another time period'
      );
      expect(clashingShiftError).toBeTruthy();
    });
  });

  describe('Single time clashes', () => {
    it('should display a single error for shift clash', () => {
      renderWithApplicationContext(
        <TimeInputErrors
          clashingProperty={clashingProperties.startTime}
          clashes={singleShiftClash}
          timePeriodTypesMap={timePeriodTypesMap}
        />
      );

      const clashingShiftError = screen.getByText(
        'You are already assigned to work from 08:00 to 12:00 on 3 November 2022'
      );
      expect(clashingShiftError).toBeTruthy();
    });

    it('should display a single error for scheduled rest day clash', () => {
      const singleScheduledRestDayClash = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
          startTime: '2022-11-03T00:00:00.000+00:00',
          endTime: '2022-11-04T00:00:00.000+00:00',
        },
      ];

      renderWithApplicationContext(
        <TimeInputErrors
          clashingProperty={clashingProperties.startTime}
          clashes={singleScheduledRestDayClash}
          timePeriodTypesMap={timePeriodTypesMap}
        />
      );

      const clashingShiftError = screen.getByText(
        'You are already assigned a scheduled rest day on 3 November 2022'
      );
      expect(clashingShiftError).toBeTruthy();
    });

    it('should display a single error for non-working day clash', () => {
      const singleNonWorkingDayClash = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000003',
          startTime: '2022-11-03T00:00:00.000+00:00',
          endTime: '2022-11-04T00:00:00.000+00:00',
        },
      ];

      renderWithApplicationContext(
        <TimeInputErrors
          clashingProperty={clashingProperties.startTime}
          clashes={singleNonWorkingDayClash}
          timePeriodTypesMap={timePeriodTypesMap}
        />
      );

      const clashingShiftError = screen.getByText(
        'You are already assigned a non-working day on 3 November 2022'
      );
      expect(clashingShiftError).toBeTruthy();
    });

    it('should only include the clashing shift start time in the error message when there is no clashing shift end time', () => {
      const shiftClash = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T08:00:00.000+00:00',
        },
      ];

      renderWithApplicationContext(
        <TimeInputErrors
          clashingProperty={clashingProperties.startTime}
          clashes={shiftClash}
          timePeriodTypesMap={timePeriodTypesMap}
        />
      );

      const startTimeClashText =
        'You are already assigned to work from 08:00 on 3 November 2022';

      expect(screen.getByText(startTimeClashText)).toBeTruthy();
      expect(screen.queryByText(`${startTimeClashText} to`)).toBeFalsy();
    });
  });

  describe('Multiple time clashes', () => {
    it('should display both errors for two shift clashes', () => {
      const twoShiftClashes = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T08:00:00.000+00:00',
          endTime: '2022-11-03T12:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T17:00:00.000+00:00',
          endTime: '2022-11-03T18:00:00.000+00:00',
        },
      ];

      renderWithApplicationContext(
        <TimeInputErrors
          clashingProperty={clashingProperties.startTime}
          clashes={twoShiftClashes}
          timePeriodTypesMap={timePeriodTypesMap}
        />
      );

      const clashingShiftError = screen.getByText(
        'You are already assigned to the following time periods:'
      );
      const firstClashingShift = screen.getByText(
        '08:00 to 12:00 on 3 November 2022'
      );
      const secondClashingShift = screen.getByText(
        '17:00 to 18:00 on 3 November 2022'
      );

      expect(clashingShiftError).toBeTruthy();
      expect(firstClashingShift).toBeTruthy();
      expect(secondClashingShift).toBeTruthy();
    });

    it('should display both errors for SRD and shift clashes', () => {
      const shiftAndSRDClashes = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T08:00:00.000+00:00',
          endTime: '2022-11-03T12:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
          startTime: '2022-11-04T00:00:00.000+00:00',
          endTime: '2022-11-05T00:00:00.000+00:00',
        },
      ];

      renderWithApplicationContext(
        <TimeInputErrors
          clashingProperty={clashingProperties.startTime}
          clashes={shiftAndSRDClashes}
          timePeriodTypesMap={timePeriodTypesMap}
        />
      );

      const clashingTimePeriodError = screen.getByText(
        'You are already assigned to the following time periods:'
      );
      const clashingShift = screen.getByText(
        '08:00 to 12:00 on 3 November 2022'
      );
      const clashingSRD = screen.getByText(
        'scheduled rest day on 4 November 2022'
      );

      expect(clashingTimePeriodError).toBeTruthy();
      expect(clashingShift).toBeTruthy();
      expect(clashingSRD).toBeTruthy();
    });

    it('should display both errors for SRD and NWD clashes', () => {
      const shiftAndSRDClashes = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000003',
          startTime: '2022-11-03T00:00:00.000+00:00',
          endTime: '2022-11-04T00:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
          startTime: '2022-11-04T00:00:00.000+00:00',
          endTime: '2022-11-05T00:00:00.000+00:00',
        },
      ];

      renderWithApplicationContext(
        <TimeInputErrors
          clashingProperty={clashingProperties.startTime}
          clashes={shiftAndSRDClashes}
          timePeriodTypesMap={timePeriodTypesMap}
        />
      );

      const clashingTimePeriodError = screen.getByText(
        'You are already assigned to the following time periods:'
      );
      const clashingNWD = screen.getByText(
        'non-working day on 3 November 2022'
      );
      const clashingSRD = screen.getByText(
        'scheduled rest day on 4 November 2022'
      );

      expect(clashingTimePeriodError).toBeTruthy();
      expect(clashingNWD).toBeTruthy();
      expect(clashingSRD).toBeTruthy();
    });

    it('should display time clashes in chronological order by start time', () => {
      const shiftAndSRDClashes = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-04T12:00:00.000+00:00',
          endTime: '2022-11-05T16:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000003',
          startTime: '2022-11-03T00:00:00.000+00:00',
          endTime: '2022-11-04T00:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-04T08:00:00.000+00:00',
          endTime: '2022-11-04T12:00:00.000+00:00',
        },
      ];

      renderWithApplicationContext(
        <TimeInputErrors
          clashingProperty={clashingProperties.startTime}
          clashes={shiftAndSRDClashes}
          timePeriodTypesMap={timePeriodTypesMap}
        />
      );

      const clashingTimePeriods = screen
        .getAllByTestId('test')
        .map(getNodeText);

      expect(clashingTimePeriods[0]).toEqual(
        'non-working day on 3 November 2022'
      );
      expect(clashingTimePeriods[1]).toEqual(
        '08:00 to 12:00 on 4 November 2022'
      );
      expect(clashingTimePeriods[2]).toEqual(
        '12:00 on 4 November 2022 to 16:00 on 5 November 2022'
      );
    });

    it('should display time clashes in chronological order by start time and date', () => {
      const shiftAndSRDClashes = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T09:00:00.000+00:00',
          endTime: '2022-11-04T16:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-04T08:00:00.000+00:00',
          endTime: '2022-11-04T12:00:00.000+00:00',
        },
      ];

      renderWithApplicationContext(
        <TimeInputErrors
          clashingProperty={clashingProperties.startTime}
          clashes={shiftAndSRDClashes}
          timePeriodTypesMap={timePeriodTypesMap}
        />
      );

      const clashingTimePeriods = screen
        .getAllByTestId('test')
        .map(getNodeText);

      expect(clashingTimePeriods[0]).toEqual(
        '09:00 on 3 November 2022 to 16:00 on 4 November 2022'
      );
      expect(clashingTimePeriods[1]).toEqual(
        '08:00 to 12:00 on 4 November 2022'
      );
    });

    it('should only include the clashing shift start time in the error message when there is no clashing shift end time', () => {
      const shiftClash = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T08:00:00.000+00:00',
          endTime: '2022-11-04T16:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-04T17:00:00.000+00:00',
        },
      ];

      renderWithApplicationContext(
        <TimeInputErrors
          clashingProperty={clashingProperties.startTime}
          clashes={shiftClash}
          timePeriodTypesMap={timePeriodTypesMap}
        />
      );

      const clashingTimePeriods = screen
        .getAllByTestId('test')
        .map(getNodeText);

      expect(clashingTimePeriods[0]).toEqual(
        '08:00 on 3 November 2022 to 16:00 on 4 November 2022'
      );

      const secondTimePeriodClashText = '17:00 on 4 November 2022';
      expect(clashingTimePeriods[1].trimEnd()).toEqual(
        secondTimePeriodClashText
      );
      expect(screen.queryByText(`${secondTimePeriodClashText} to`)).toBeFalsy();
    });
  });

  describe('Clash finishes on a different day', () => {
    it('should display both days for a single shift clash that is over two days', () => {
      const shiftClash = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T08:00:00.000+00:00',
          endTime: '2022-11-04T12:00:00.000+00:00',
        },
      ];

      renderWithApplicationContext(
        <TimeInputErrors
          clashingProperty={clashingProperties.startTime}
          clashes={shiftClash}
          timePeriodTypesMap={timePeriodTypesMap}
        />
      );

      const clashingShiftError = screen.getByText(
        'You are already assigned to work from 08:00 on 3 November 2022 to 12:00 on 4 November 2022'
      );

      expect(clashingShiftError).toBeTruthy();
    });

    it('should display both days for two shift clashes that are over two days', () => {
      const shiftClash = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T08:00:00.000+00:00',
          endTime: '2022-11-04T12:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-04T07:00:00.000+00:00',
          endTime: '2022-11-05T11:00:00.000+00:00',
        },
      ];

      renderWithApplicationContext(
        <TimeInputErrors
          clashingProperty={clashingProperties.startTime}
          clashes={shiftClash}
          timePeriodTypesMap={timePeriodTypesMap}
        />
      );

      const firstClashingShiftError = screen.getByText(
        '08:00 on 3 November 2022 to 12:00 on 4 November 2022'
      );
      const secondClashingShiftError = screen.getByText(
        '07:00 on 4 November 2022 to 11:00 on 5 November 2022'
      );

      expect(firstClashingShiftError).toBeTruthy();
      expect(secondClashingShiftError).toBeTruthy();
    });
  });

  describe('Invalid input', () => {
    it('should throw an error if no clashes are given', () => {
      expect(() =>
        renderWithApplicationContext(
          <TimeInputErrors
            clashingProperty={clashingProperties.startTime}
            clashes={[]}
            timePeriodTypesMap={timePeriodTypesMap}
          />
        )
      ).toThrow(
        'The time clashes data did not contain at least one time clash.'
      );
    });
  });
});
