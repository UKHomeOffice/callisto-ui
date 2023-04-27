import { ContextTimeEntry } from '../../../../utils/time-entry-utils/ContextTimeEntry';
import ValidatedTimeEntry from './ValidatedTimeEntry';
import { inputNames } from '../../../../utils/constants';
import { renderWithApplicationContext } from '../../../../test/helpers/TestApplicationContext';

describe('ValidatedTimeEntry', () => {
  const timeEntry = new ContextTimeEntry();

  it('should render start time correctly', () => {
    const component = renderWithApplicationContext(
      <ValidatedTimeEntry
        name={inputNames.shiftStartTime}
        timeType="start time"
        errors={[]}
        register={jest.fn()}
        getFormValues={jest.fn()}
        timeEntry={timeEntry}
        timeEntriesIndex={0}
        updateFinishTimeText={jest.fn()}
      />
    );

    expect(component).toBeTruthy();
  });

  it('should render finish time correctly', () => {
    const component = renderWithApplicationContext(
      <ValidatedTimeEntry
        name={inputNames.shiftFinishTime}
        timeType="finish time"
        errors={[]}
        register={jest.fn()}
        getFormValues={jest.fn()}
        timeEntry={timeEntry}
        timeEntriesIndex={0}
        updateFinishTimeText={jest.fn()}
      />
    );

    expect(component).toBeTruthy();
  });
});
