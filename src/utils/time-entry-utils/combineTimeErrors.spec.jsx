import { timePeriodTypesMap } from '../../../mocks/mockData';
import TimeInputErrors from '../../components/timecard/time-input-errors/TimeInputErrors';
import { clashingProperties, inputNames } from '../constants';
import { combineExistingAndTimeClashErrors } from './combineTimeErrors';

describe('combineExistingAndTimeClashErrors', () => {
  it('should return an empty array when no errors are passed in', async () => {
    const result = combineExistingAndTimeClashErrors(
      [],
      null,
      null,
      timePeriodTypesMap
    );

    expect(result).toEqual([]);
  });

  it('should return only the original errors when no time clash errors are passed in', async () => {
    const result = combineExistingAndTimeClashErrors(
      [{ foo: 'bar' }],
      null,
      null,
      timePeriodTypesMap
    );

    expect(result).toEqual([{ foo: 'bar' }]);
  });

  it('should add a start time error when start time is the clashing property', async () => {
    const expectedClashMessage = (
      <TimeInputErrors
        clashes={[]}
        clashingProperty={clashingProperties.startTime}
        timePeriodTypesMap={timePeriodTypesMap}
      />
    );

    const result = combineExistingAndTimeClashErrors(
      [{ foo: 'bar' }],
      clashingProperties.startTime,
      [],
      timePeriodTypesMap
    );

    expect(result).toEqual([
      {
        foo: 'bar',
      },
      {
        key: 'startTimeClash',
        inputName: inputNames.shiftStartTime,
        message: { message: expectedClashMessage },
        errorPriority: 1,
      },
    ]);
  });

  it('should add a finish time error when finish time is the clashing property', async () => {
    const expectedClashMessage = (
      <TimeInputErrors
        clashes={[]}
        clashingProperty={clashingProperties.endTime}
        timePeriodTypesMap={timePeriodTypesMap}
      />
    );

    const result = combineExistingAndTimeClashErrors(
      [{ foo: 'bar' }],
      clashingProperties.endTime,
      [],
      timePeriodTypesMap
    );

    expect(result).toEqual([
      { foo: 'bar' },
      {
        key: 'finishTimeClash',
        inputName: inputNames.shiftFinishTime,
        message: { message: expectedClashMessage },
        errorPriority: 1,
      },
    ]);
  });

  it('should add a start and end time error when start and end time time is the clashing property', async () => {
    const expectedClashMessage = (
      <TimeInputErrors
        clashes={[]}
        clashingProperty={clashingProperties.startAndEndTime}
        timePeriodTypesMap={timePeriodTypesMap}
      />
    );

    const result = combineExistingAndTimeClashErrors(
      [{ foo: 'bar' }],
      clashingProperties.startAndEndTime,
      [],
      timePeriodTypesMap
    );

    expect(result).toEqual([
      { foo: 'bar' },
      {
        key: 'startTimeClash',
        inputName: inputNames.shiftStartTime,
        message: { message: expectedClashMessage },
        errorPriority: 1,
      },
      {
        key: 'finishTimeClash',
        inputName: inputNames.shiftFinishTime,
        message: '',
        errorPriority: 2,
      },
    ]);
  });
});
