import { renderWithTimecardContext } from '../../../../test/helpers/TimecardContext';
import { ContextTimeEntry } from '../../../../utils/time-entry-utils/ContextTimeEntry';

import ValidatedTimeEntry from './ValidatedTimeEntry';

describe('ValidatedTimeEntry', () => {
  const timeEntry = new ContextTimeEntry();

  it('should render start time correctly', () => {
    const component = renderWithTimecardContext(
      <ValidatedTimeEntry
        name="shift-start-time"
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
        name="shift-finish-time"
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
});
