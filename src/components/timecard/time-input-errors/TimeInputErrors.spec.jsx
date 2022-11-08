import { screen } from '@testing-library/react';
import { renderWithTimecardContext } from '../../../test/helpers/TimecardContext';
import TimeInputErrors from './TimeInputErrors';

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
      renderWithTimecardContext(
        <TimeInputErrors
          clashingProperty={'startTime'}
          clashes={singleShiftClash}
        />
      );

      const clashingShiftError = screen.getByText(
        'Your start time must not overlap with another time period'
      );
      expect(clashingShiftError).toBeTruthy();
    });

    it('should display a single error for finish time clash', () => {
      renderWithTimecardContext(
        <TimeInputErrors
          clashingProperty={'endTime'}
          clashes={singleShiftClash}
        />
      );

      const clashingShiftError = screen.getByText(
        'Your finish time must not overlap with another time period'
      );
      expect(clashingShiftError).toBeTruthy();
    });

    it('should display a single error for start and finish time clash', () => {
      renderWithTimecardContext(
        <TimeInputErrors
          clashingProperty={'startAndEndTime'}
          clashes={singleShiftClash}
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
      renderWithTimecardContext(
        <TimeInputErrors
          clashingProperty={'startTime'}
          clashes={singleShiftClash}
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

      renderWithTimecardContext(
        <TimeInputErrors
          clashingProperty={'startTime'}
          clashes={singleScheduledRestDayClash}
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

      renderWithTimecardContext(
        <TimeInputErrors
          clashingProperty={'startTime'}
          clashes={singleNonWorkingDayClash}
        />
      );

      const clashingShiftError = screen.getByText(
        'You are already assigned a non-working day on 3 November 2022'
      );
      expect(clashingShiftError).toBeTruthy();
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

      renderWithTimecardContext(
        <TimeInputErrors
          clashingProperty={'startTime'}
          clashes={twoShiftClashes}
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

      renderWithTimecardContext(
        <TimeInputErrors
          clashingProperty={'startTime'}
          clashes={shiftAndSRDClashes}
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

      renderWithTimecardContext(
        <TimeInputErrors
          clashingProperty={'startTime'}
          clashes={shiftAndSRDClashes}
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
  });
});