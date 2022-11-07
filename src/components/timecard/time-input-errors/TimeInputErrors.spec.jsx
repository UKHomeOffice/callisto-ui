import { render, screen } from '@testing-library/react';
import TimeInputErrors from './TimeInputErrors';

describe('TimeInputErrors', () => {
  const singleShiftClash = [
    {
      timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
      startTime: '2022-11-07T08:00:00.000+00:00',
      endTime: '2022-11-07T12:00:00.000+00:00',
    },
  ];

  const singleScheduledRestDayClash = [
    {
      timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
      startTime: '2022-11-07T00:00:00.000+00:00',
      endTime: '2022-11-08T00:00:00.000+00:00',
    },
  ];

  describe('Clashing properties', () => {
    it('should display a single error for start time clash', () => {
      render(
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
      render(
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
      render(
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
      render(
        <TimeInputErrors
          clashingProperty={'startTime'}
          clashes={singleShiftClash}
        />
      );

      const clashingShiftError = screen.getByText(
        'You are already assigned to work from 08:00 to 12:00 on 2022-11-07'
      );
      expect(clashingShiftError).toBeTruthy();
    });

    it('should display a single error for scheduled rest day clash', () => {
      render(
        <TimeInputErrors
          clashingProperty={'startTime'}
          clashes={singleScheduledRestDayClash}
        />
      );

      const clashingShiftError = screen.getByText(
        'You are already assigned a scheduled rest day on 2022-11-07'
      );
      expect(clashingShiftError).toBeTruthy();
    });
  });
});
