import { renderWithTimecardContext } from '../../../../test/helpers/TimecardContext';
import { ContextTimeEntry } from '../../../../utils/time-entry-utils/ContextTimeEntry';
import { fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';

import ValidatedTimeEntry from './ValidatedTimeEntry';
import { inputNames } from '../../../../utils/constants';

describe('ValidatedTimeEntry', () => {
  const timeEntry = new ContextTimeEntry();

  it('should render start time correctly', () => {
    const component = renderWithTimecardContext(
      <ValidatedTimeEntry
        name={inputNames.shiftStartTime}
        timeType="start time"
        errors={{}}
        register={jest.fn()}
        getFormValues={jest.fn()}
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
        geFormValues={jest.fn()}
        timeEntry={timeEntry}
        timeEntriesIndex={0}
      />
    );

    expect(component).toBeTruthy();
  });
});
