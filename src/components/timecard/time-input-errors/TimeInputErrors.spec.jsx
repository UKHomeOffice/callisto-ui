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

  const singleScheduledRestDayClash = [
    {
      timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
      startTime: '2022-11-03T00:00:00.000+00:00',
      endTime: '2022-11-04T00:00:00.000+00:00',
    },
  ];

  const singleNonWorkingDayClash = [
    {
      timePeriodTypeId: '00000000-0000-0000-0000-000000000003',
      startTime: '2022-11-03T00:00:00.000+00:00',
      endTime: '2022-11-04T00:00:00.000+00:00',
    },
  ];

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
      renderWithTimecardContext(
        <TimeInputErrors
          clashingProperty={'startTime'}
          clashes={twoShiftClashes}
        />
      );

      const clashingShiftError = screen.getByText(
        'You are already assigned to the following time periods:'
      );
      expect(clashingShiftError).toBeTruthy();

      const clashingShiftError1 = screen.getByText(
        '08:00 to 12:00 on 3 November 2022'
      );
      expect(clashingShiftError1).toBeTruthy();

      const clashingShiftError2 = screen.getByText(
        '17:00 to 18:00 on 3 November 2022'
      );
      expect(clashingShiftError2).toBeTruthy();
    });
  });
});
