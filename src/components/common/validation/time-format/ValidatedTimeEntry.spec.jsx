import { renderWithTimecardContext } from '../../../../test/helpers/TimecardContext';
import { ContextTimeEntry } from '../../../../utils/time-entry-utils/ContextTimeEntry';
import { fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';

import ValidatedTimeEntry from './ValidatedTimeEntry';
import { inputNames } from '../../../../utils/time-entry-utils/timeEntryUtils';

describe('ValidatedTimeEntry', () => {
  const timeEntry = new ContextTimeEntry();

  it('should render start time correctly', () => {
    const component = renderWithTimecardContext(
      <ValidatedTimeEntry
        name={inputNames.shiftStartTime}
        timeType="start time"
        errors={{}}
        register={jest.fn()}
        getValues={jest.fn()}
        timeEntry={timeEntry}
        timeEntriesIndex={0}
      />
    );

    expect(component).toBeTruthy();
  });

  it('should render finish time correctly', () => {
    const component = renderWithTimecardContext(
      <ValidatedTimeEntry
        name={inputNames.shiftFinishTime}
        timeType="finish time"
        errors={{}}
        register={jest.fn()}
        getValues={jest.fn()}
        timeEntry={timeEntry}
        timeEntriesIndex={0}
      />
    );

    expect(component).toBeTruthy();
  });

  it('should call onblur method', async () => {
    const setFinishTimeTextSpy = jest.fn();

    const component = renderWithTimecardContext(
      <ValidatedTimeEntry
        name="shift-finish-time"
        timeType="finish time"
        errors={{}}
        register={setFinishTimeTextSpy}
        getValues={jest.fn()}
        timeEntry={timeEntry}
        timeEntriesIndex={0}
      />
    );

    act(() => {
      const someElement =
        component.container.querySelector('#shift-finish-time');
      fireEvent.blur(someElement);
    });

    await waitFor(() => {
      expect(setFinishTimeTextSpy).toBeCalledTimes(1);
    });
  });
});
