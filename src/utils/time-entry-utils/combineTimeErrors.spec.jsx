import TimeInputErrors from '../../components/timecard/time-input-errors/TimeInputErrors';
import { clashingProperties, inputNames } from '../constants';
import { combineExistingAndTimeClashErrors } from './combineTimeErrors';

describe('combineExistingAndTimeClashErrors', () => {
  it('should return an empty array when no errors are passed in', async () => {
    var result = combineExistingAndTimeClashErrors({}, {}, null, null);

    expect(result).toEqual({});
  });

  it('should return only the original errors when no time clash errors are passed in', async () => {
    var result = combineExistingAndTimeClashErrors(
      { foo: 'bar' },
      {},
      null,
      null
    );

    expect(result).toEqual({ foo: 'bar' });
  });

  it('should add a start time error when start time is the clashing property', async () => {
    var expectedClashMessage = (
      <TimeInputErrors
        clashes={[]}
        clashingProperty={clashingProperties.startTime}
      />
    );

    var result = combineExistingAndTimeClashErrors(
      { foo: 'bar' },
      {},
      clashingProperties.startTime,
      []
    );

    expect(result).toEqual({
      foo: 'bar',
      [inputNames.shiftStartTime]: { message: expectedClashMessage },
    });
  });

  it('should add a finish time error when finish time is the clashing property', async () => {
    var expectedClashMessage = (
      <TimeInputErrors
        clashes={[]}
        clashingProperty={clashingProperties.endTime}
      />
    );

    var result = combineExistingAndTimeClashErrors(
      { foo: 'bar' },
      {},
      clashingProperties.endTime,
      []
    );

    expect(result).toEqual({
      foo: 'bar',
      [inputNames.shiftFinishTime]: { message: expectedClashMessage },
    });
  });

  it('should add a start and end time error when start and end time time is the clashing property', async () => {
    var expectedClashMessage = (
      <TimeInputErrors
        clashes={[]}
        clashingProperty={clashingProperties.startAndEndTime}
      />
    );

    var result = combineExistingAndTimeClashErrors(
      { foo: 'bar' },
      {},
      clashingProperties.startAndEndTime,
      []
    );

    expect(result).toEqual({
      foo: 'bar',
      [inputNames.shiftStartTime]: { message: expectedClashMessage },
      [inputNames.shiftFinishTime]: { message: '' },
    });
  });
});
