import { timePeriodTypesMap } from '../../../mocks/mockData';
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
    const expectedClashMessage = {
      summaryMessage:
        'Your start time must not overlap with another time period',
      clashMessages: {
        fieldErrorSummary: 'You are already assigned to work from:',
        clashMessages: ['07:00 to 10:00 on 20 April 2023'],
      },
    };

    const result = combineExistingAndTimeClashErrors(
      [
        {
          key: 'overlappingStart',
          inputName: 'shift-start-time',
          message: 'Your start time must not overlap with another time period',
          errorPriority: 1,
        },
      ],
      clashingProperties.startTime,
      [
        {
          startTime: '2023-04-20T07:00:00.000+00:00',
          endTime: '2023-04-20T10:00:00.000+00:00',
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
        },
      ],
      timePeriodTypesMap
    );

    expect(result).toEqual([
      {
        key: 'overlappingStart',
        inputName: inputNames.shiftStartTime,
        message: expectedClashMessage,
        errorPriority: 1,
      },
    ]);
  });

  it('should add a finish time error when finish time is the clashing property', async () => {
    const expectedClashMessage = {
      summaryMessage:
        'Your finish time must not overlap with another time period',
      clashMessages: {
        fieldErrorSummary: 'You are already assigned to work from:',
        clashMessages: ['07:00 to 10:00 on 20 April 2023'],
      },
    };

    const result = combineExistingAndTimeClashErrors(
      [
        {
          key: 'overlappingFinish',
          inputName: 'shift-finish-time',
          message: 'Your finish time must not overlap with another time period',
          errorPriority: 1,
        },
      ],
      clashingProperties.endTime,
      [
        {
          startTime: '2023-04-20T07:00:00.000+00:00',
          endTime: '2023-04-20T10:00:00.000+00:00',
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
        },
      ],
      timePeriodTypesMap
    );

    expect(result).toEqual([
      {
        key: 'overlappingFinish',
        inputName: inputNames.shiftFinishTime,
        message: expectedClashMessage,
        errorPriority: 1,
      },
    ]);
  });

  it('should add a start and end time error when start and end time time is the clashing property', async () => {
    const expectedClashMessage = {
      summaryMessage:
        'Your start and finish times must not overlap with another time period',
      clashMessages: {
        fieldErrorSummary: 'You are already assigned to work from:',
        clashMessages: ['07:00 to 10:00 on 20 April 2023'],
      },
    };

    const result = combineExistingAndTimeClashErrors(
      [
        {
          key: 'bothDatesOverlapping',
          inputName: 'shift-start-time',
          message:
            'Your start and finish times must not overlap with another time period',
          errorPriority: 1,
        },
      ],
      clashingProperties.startAndEndTime,
      [
        {
          startTime: '2023-04-20T07:00:00.000+00:00',
          endTime: '2023-04-20T10:00:00.000+00:00',
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
        },
      ],
      timePeriodTypesMap
    );

    expect(result).toEqual([
      {
        key: 'bothDatesOverlapping',
        inputName: inputNames.shiftStartTime,
        message: expectedClashMessage,
        errorPriority: 1,
      },
      {
        key: 'finishDateClash',
        inputName: inputNames.shiftFinishTime,
        message: '',
        errorPriority: 2,
      },
    ]);
  });
});
