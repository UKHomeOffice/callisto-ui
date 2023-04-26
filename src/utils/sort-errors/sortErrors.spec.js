import { sortErrors } from './sortErrors';

describe('sortErrorsByPriority', () => {
  it('should deep clone an object', () => {
    const unsortedErrors = [
      {
        key: 'invalidEnd',
        inputName: 'shift-finish-time',
        message: 'Test message for end time',
        errorPriority: 2,
      },
      {
        key: 'invalidStart',
        inputName: 'shift-start-time',
        message: 'Test message for start time',
        errorPriority: 1,
      },
    ];
    const result = sortErrors(unsortedErrors);

    const sortedErrors = [
      {
        key: 'invalidStart',
        inputName: 'shift-start-time',
        message: 'Test message for start time',
        errorPriority: 1,
      },
      {
        key: 'invalidEnd',
        inputName: 'shift-finish-time',
        message: 'Test message for end time',
        errorPriority: 2,
      },
    ];

    expect(result).toEqual(sortedErrors);
  });
});
