import { render, screen } from '@testing-library/react';
import TimeInputErrors from './TimeInputErrors';

describe('TimeInputErrors', () => {
  it('should display a single error for start time clash', () => {
    render(<TimeInputErrors clashingProperty={'startTime'} />);

    const clashingShiftError = screen.getByText(
      'Your start time must not overlap with another time period'
    );
    expect(clashingShiftError).toBeTruthy();
  });

  it('should display a single error for finish time clash', () => {
    render(<TimeInputErrors clashingProperty={'endTime'} />);

    const clashingShiftError = screen.getByText(
      'Your finish time must not overlap with another time period'
    );
    expect(clashingShiftError).toBeTruthy();
  });

  it('should display a single error for start and finish time clash', () => {
    render(<TimeInputErrors clashingProperty={'startAndEndTime'} />);

    const clashingShiftError = screen.getByText(
      'Your start and finish times must not overlap with another time period'
    );
    expect(clashingShiftError).toBeTruthy();
  });
});
