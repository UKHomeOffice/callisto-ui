import { getNodeText, screen } from '@testing-library/react';
import { renderWithApplicationContext } from '../../../test/helpers/TestApplicationContext';
import { clashingProperties } from '../../../utils/constants';
import TimeInputErrors, { createClashErrorsObject } from './TimeInputErrors';
import { timePeriodTypesMap } from '../../../../mocks/mockData';

describe('TimeInputErrors', () => {
  const singleShiftClash = [
    {
      timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
      startTime: '2022-11-03T08:00:00.000+00:00',
      endTime: '2022-11-03T12:00:00.000+00:00',
    },
  ];

  describe('Clashing properties', () => {
    it('should display a single error for start time clash', () => {
      const expectedResult = {
        clashMessages: {
          clashMessages: ['08:00 to 12:00 on 3 November 2022'],
          fieldErrorSummary: 'You are already assigned to work from:',
        },
        summaryMessage:
          'Your start time must not overlap with another time period',
      };

      const result = createClashErrorsObject(
        clashingProperties.startTime,
        singleShiftClash,
        timePeriodTypesMap
      );

      expect(result).toEqual(expectedResult);
    });

    it('should display a single error for finish time clash', () => {
      const expectedResult = {
        clashMessages: {
          clashMessages: ['08:00 to 12:00 on 3 November 2022'],
          fieldErrorSummary: 'You are already assigned to work from:',
        },
        summaryMessage:
          'Your finish time must not overlap with another time period',
      };

      const result = createClashErrorsObject(
        clashingProperties.endTime,
        singleShiftClash,
        timePeriodTypesMap
      );

      expect(result).toEqual(expectedResult);
    });

    it('should display a single error for start and finish time clash', () => {
      const expectedResult = {
        clashMessages: {
          clashMessages: ['08:00 to 12:00 on 3 November 2022'],
          fieldErrorSummary: 'You are already assigned to work from:',
        },
        summaryMessage:
          'Your start and finish times must not overlap with another time period',
      };

      const result = createClashErrorsObject(
        clashingProperties.startAndEndTime,
        singleShiftClash,
        timePeriodTypesMap
      );

      expect(result).toEqual(expectedResult);
    });
  });

  describe('Single time clashes', () => {
    it('should display a single error for scheduled rest day clash', () => {
      const singleScheduledRestDayClash = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
          startTime: '2022-11-03T00:00:00.000+00:00',
          endTime: '2022-11-04T00:00:00.000+00:00',
        },
      ];

      const expectedResult = {
        clashMessages: {
          clashMessages: ['scheduled rest day on 3 November 2022'],
          fieldErrorSummary: 'You are already assigned a:',
        },
        summaryMessage:
          'You are already assigned a scheduled rest day on 3 November 2022',
      };

      const result = createClashErrorsObject(
        clashingProperties.startAndEndTime,
        singleScheduledRestDayClash,
        timePeriodTypesMap
      );

      expect(result).toEqual(expectedResult);
    });

    it('should display a single error for non-working day clash', () => {
      const singleNonWorkingDayClash = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000003',
          startTime: '2022-11-03T00:00:00.000+00:00',
          endTime: '2022-11-04T00:00:00.000+00:00',
        },
      ];

      const expectedResult = {
        clashMessages: {
          clashMessages: ['non-working day on 3 November 2022'],
          fieldErrorSummary: 'You are already assigned a:',
        },
        summaryMessage:
          'You are already assigned a non-working day on 3 November 2022',
      };

      const result = createClashErrorsObject(
        clashingProperties.startAndEndTime,
        singleNonWorkingDayClash,
        timePeriodTypesMap
      );

      expect(result).toEqual(expectedResult);
    });

    it('should only include the clashing shift start time in the error message when there is no clashing shift end time', () => {
      const shiftClash = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T08:00:00.000+00:00',
        },
      ];

      const expectedResult = {
        clashMessages: {
          clashMessages: ['08:00 on 3 November 2022 '],
          fieldErrorSummary: 'You are already assigned to work from:',
        },
        summaryMessage:
          'Your start and finish times must not overlap with another time period',
      };

      const result = createClashErrorsObject(
        clashingProperties.startAndEndTime,
        shiftClash,
        timePeriodTypesMap
      );

      expect(result).toEqual(expectedResult);
    });
  });

  describe('Multiple time clashes', () => {
    it('should display both errors for two shift clashes', () => {
      const twoShiftClashes = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T08:00:00.000+00:00',
          endTime: '2022-11-03T12:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T17:00:00.000+00:00',
          endTime: '2022-11-03T18:00:00.000+00:00',
        },
      ];

      const expectedResult = {
        clashMessages: {
          clashMessages: [
            '08:00 to 12:00 on 3 November 2022',
            '17:00 to 18:00 on 3 November 2022',
          ],
          fieldErrorSummary:
            'You are already assigned to the following time periods:',
        },
        summaryMessage:
          'Your start and finish times must not overlap with another time period',
      };

      const result = createClashErrorsObject(
        clashingProperties.startAndEndTime,
        twoShiftClashes,
        timePeriodTypesMap
      );

      expect(result).toEqual(expectedResult);
    });

    it('should display both errors for SRD and shift clashes', () => {
      const shiftAndSRDClashes = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T08:00:00.000+00:00',
          endTime: '2022-11-03T12:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
          startTime: '2022-11-04T00:00:00.000+00:00',
          endTime: '2022-11-05T00:00:00.000+00:00',
        },
      ];

      const expectedResult = {
        clashMessages: {
          clashMessages: [
            '08:00 to 12:00 on 3 November 2022',
            'scheduled rest day on 4 November 2022',
          ],
          fieldErrorSummary:
            'You are already assigned to the following time periods:',
        },
        summaryMessage:
          'Your start and finish times must not overlap with another time period',
      };

      const result = createClashErrorsObject(
        clashingProperties.startAndEndTime,
        shiftAndSRDClashes,
        timePeriodTypesMap
      );

      expect(result).toEqual(expectedResult);
    });

    it('should display both errors for SRD and NWD clashes', () => {
      const shiftAndSRDClashes = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000003',
          startTime: '2022-11-03T00:00:00.000+00:00',
          endTime: '2022-11-04T00:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
          startTime: '2022-11-04T00:00:00.000+00:00',
          endTime: '2022-11-05T00:00:00.000+00:00',
        },
      ];

      const expectedResult = {
        clashMessages: {
          clashMessages: [
            'non-working day on 3 November 2022',
            'scheduled rest day on 4 November 2022',
          ],
          fieldErrorSummary:
            'You are already assigned to the following time periods:',
        },
        summaryMessage:
          'Your start and finish times must not overlap with another time period',
      };

      const result = createClashErrorsObject(
        clashingProperties.startAndEndTime,
        shiftAndSRDClashes,
        timePeriodTypesMap
      );

      expect(result).toEqual(expectedResult);
    });

    it('should display time clashes in chronological order by start time', () => {
      const shiftAndSRDClashes = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-04T12:00:00.000+00:00',
          endTime: '2022-11-05T16:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000003',
          startTime: '2022-11-03T00:00:00.000+00:00',
          endTime: '2022-11-04T00:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-04T08:00:00.000+00:00',
          endTime: '2022-11-04T12:00:00.000+00:00',
        },
      ];

      const expectedResult = {
        clashMessages: {
          clashMessages: [
            'non-working day on 3 November 2022',
            '08:00 to 12:00 on 4 November 2022',
            '12:00 on 4 November 2022 to 16:00 on 5 November 2022',
          ],
          fieldErrorSummary:
            'You are already assigned to the following time periods:',
        },
        summaryMessage:
          'Your start and finish times must not overlap with another time period',
      };

      const result = createClashErrorsObject(
        clashingProperties.startAndEndTime,
        shiftAndSRDClashes,
        timePeriodTypesMap
      );

      expect(result).toEqual(expectedResult);
    });

    it('should display time clashes in chronological order by start time and date', () => {
      const shiftAndSRDClashes = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T09:00:00.000+00:00',
          endTime: '2022-11-04T16:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-04T08:00:00.000+00:00',
          endTime: '2022-11-04T12:00:00.000+00:00',
        },
      ];

      const expectedResult = {
        clashMessages: {
          clashMessages: [
            '09:00 on 3 November 2022 to 16:00 on 4 November 2022',
            '08:00 to 12:00 on 4 November 2022',
          ],
          fieldErrorSummary:
            'You are already assigned to the following time periods:',
        },
        summaryMessage:
          'Your start and finish times must not overlap with another time period',
      };

      const result = createClashErrorsObject(
        clashingProperties.startAndEndTime,
        shiftAndSRDClashes,
        timePeriodTypesMap
      );

      expect(result).toEqual(expectedResult);
    });

    it('should only include the clashing shift start time in the error message when there is no clashing shift end time', () => {
      const shiftClash = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T08:00:00.000+00:00',
          endTime: '2022-11-04T16:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-04T17:00:00.000+00:00',
        },
      ];

      const expectedResult = {
        clashMessages: {
          clashMessages: [
            '08:00 on 3 November 2022 to 16:00 on 4 November 2022',
            '17:00 on 4 November 2022 ',
          ],
          fieldErrorSummary:
            'You are already assigned to the following time periods:',
        },
        summaryMessage:
          'Your start and finish times must not overlap with another time period',
      };

      const result = createClashErrorsObject(
        clashingProperties.startAndEndTime,
        shiftClash,
        timePeriodTypesMap
      );

      expect(result).toEqual(expectedResult);
    });
  });

  describe('Clash finishes on a different day', () => {
    it('should display both days for a single shift clash that is over two days', () => {
      const shiftClash = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T08:00:00.000+00:00',
          endTime: '2022-11-04T12:00:00.000+00:00',
        },
      ];

      const expectedResult = {
        clashMessages: {
          clashMessages: [
            '08:00 on 3 November 2022 to 12:00 on 4 November 2022',
          ],
          fieldErrorSummary: 'You are already assigned to work from:',
        },
        summaryMessage:
          'Your start and finish times must not overlap with another time period',
      };

      const result = createClashErrorsObject(
        clashingProperties.startAndEndTime,
        shiftClash,
        timePeriodTypesMap
      );

      expect(result).toEqual(expectedResult);
    });

    it('should display both days for two shift clashes that are over two days', () => {
      const shiftClash = [
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-03T08:00:00.000+00:00',
          endTime: '2022-11-04T12:00:00.000+00:00',
        },
        {
          timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
          startTime: '2022-11-04T07:00:00.000+00:00',
          endTime: '2022-11-05T11:00:00.000+00:00',
        },
      ];

      const expectedResult = {
        clashMessages: {
          clashMessages: [
            '08:00 on 3 November 2022 to 12:00 on 4 November 2022',
            '07:00 on 4 November 2022 to 11:00 on 5 November 2022',
          ],
          fieldErrorSummary:
            'You are already assigned to the following time periods:',
        },
        summaryMessage:
          'Your start and finish times must not overlap with another time period',
      };

      const result = createClashErrorsObject(
        clashingProperties.startAndEndTime,
        shiftClash,
        timePeriodTypesMap
      );

      expect(result).toEqual(expectedResult);
    });
  });

  describe('Invalid input', () => {
    it('should throw an error if no clashes are given', () => {
      expect(() =>
        createClashErrorsObject(
          clashingProperties.startAndEndTime,
          [],
          timePeriodTypesMap
        )
      ).toThrow(
        'The time clashes data did not contain at least one time clash.'
      );
    });
  });
});
