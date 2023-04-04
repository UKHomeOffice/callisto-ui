import { screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import SelectTimecardPeriodType from './SelectTimecardPeriodType';
import { renderWithApplicationContext } from '../../../test/helpers/TestApplicationContext';
import timePeriodTypesMap from '../../../../mocks/mockData';

const mockRegister = jest.fn();
const handleSubmit = jest.fn();
const errors = {};
const expectedTimePeriodTypes = [
  'Shift',
  'Scheduled rest day',
  'Non-working day',
  'On call',
  'Absence',
  'Training',
  'Overtime',
];

describe('SelectTimecardPeriodType', () => {
  it('should render a radios component with the correct time periods', async () => {
    renderWithApplicationContext(
      <SelectTimecardPeriodType
        register={mockRegister}
        handleSubmit={handleSubmit}
        summaryErrors={errors}
        setSummaryErrors={jest.fn()}
        timePeriodTypes={timePeriodTypesMap}
        timeEntries={[]}
        setTimeEntries={jest.fn()}
        setAddNewTimeEntry={jest.fn()}
      />
    );

    await waitFor(() => {
      expectedTimePeriodTypes.map((option) => {
        expect(screen.getByText(option)).toBeTruthy();
      });
    });
  });

  it('should display an error message when pressing submit with nothing selected', async () => {
    await waitFor(() => {
      renderWithApplicationContext(
        <SelectTimecardPeriodType
          register={mockRegister}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      );
    });

    act(() => {
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
    });

    await waitFor(() => {
      const errorMessage = screen.getByText('You must select a time period');
      expect(errorMessage).toBeTruthy();
    });
  });

  it('should not display an error message when pressing submit with something selected', async () => {
    await waitFor(() => {
      renderWithApplicationContext(
        <SelectTimecardPeriodType
          register={mockRegister}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      );
    });

    act(() => {
      const radioButton = screen.getByText('Shift');
      fireEvent.click(radioButton);
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
    });

    await waitFor(() => {
      const errorMessage = screen.queryByText('You must select a time period');
      expect(errorMessage).toBeFalsy();
    });
  });
});
