import { screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { renderWithTimecardContext } from '../../../test/helpers/TimecardContext';
import * as timecardService from '../../../api/services/timecardService';

import SelectTimecardPeriodType from './SelectTimecardPeriodType';

const mockRegister = jest.fn();
const handleSubmit = jest.fn();
const errors = {};
const mockResponse = {
  meta: {
    next: null,
  },
  items: [
    {
      name: 'Shift',
    },
    {
      name: 'Scheduled rest day',
    },
    {
      name: 'Non-working day',
    },
    {
      name: 'On call',
    },
    {
      name: 'Absence',
    },
    {
      name: 'Training',
    },
    {
      name: 'Overtime',
    },
  ],
};
const timePeriods = [
  'Shift',
  'Scheduled rest day',
  'Non-working day',
  'On call',
  'Absence',
  'Training',
  'Overtime',
];

const mockGetTimePeriodTypes = jest.spyOn(
  timecardService,
  'getTimePeriodTypes'
);

describe('SelectTimecardPeriodType', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render a radios component with the correct time periods', () => {
    mockGetTimePeriodTypes.mockResolvedValue(mockResponse);
    renderWithTimecardContext(
      <SelectTimecardPeriodType
        register={mockRegister}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    );

    timePeriods.map((option) => {
      expect(screen.findByText(option)).toBeTruthy();
    });
  });

  it('should display an error message when pressing submit with nothing selected', async () => {
    renderWithTimecardContext(
      <SelectTimecardPeriodType
        register={mockRegister}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    );

    act(() => {
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
    });

    await waitFor(() => {
      const errorMessage = screen.getByText('You must select a time period');
      expect(errorMessage).toBeTruthy();
    });
  });
});
