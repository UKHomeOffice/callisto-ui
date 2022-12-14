import {
  deleteTimeEntry,
  getTimecard,
  getTimeEntries,
  updateTimeEntry,
  getTimePeriodTypes,
} from './timecardService';
import api from '../core';
import { shiftTimeEntry } from '../../../mocks/mockData';
import { getApiResponseWithItems } from '../../../mocks/mock-utils';

const {
  timeCardPeriodTypes: MOCK_TIME_PERIOD_TYPES,
} = require('../../../mocks/mockData');
jest.mock('../core');

const timeEntryApiResponse = getApiResponseWithItems(shiftTimeEntry);
const timecard = [
  {
    meta: {
      next: null,
    },
    items: [
      {
        id: '47e813a2-bb28-11ec-8422-0242ac120001',
        tenantId: 'b7e813a2-bb28-11ec-8422-0242ac120002',
      },
    ],
  },
];

const TENANT_ID_PARAM = {
  tenantId: '00000000-0000-0000-0000-000000000000',
};

describe('Timecard Service', () => {
  describe('getTimecard', () => {
    it('should return data correctly on success', async () => {
      api.get.mockImplementation(() => Promise.resolve({ data: timecard }));

      const response = await getTimecard();

      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining('api/v1/timecard'),
        undefined
      );
      expect(response.data[0].meta).toBeDefined();
      expect(response.data[0].items).toBeDefined();
      expect(response.data[0].items.length).toBeGreaterThan(0);
      expect(response.data).toStrictEqual(timecard);
    });

    it('should use correct endpoint api/v1/timecard', async () => {
      api.get.mockImplementation(() => Promise.resolve({ data: timecard }));

      await getTimecard();

      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining('api/v1/timecard'),
        undefined
      );
    });

    it('should throw useful error containing throwing service and function when an error occurs', async () => {
      api.get.mockImplementation(() => {
        throw new Error('xyz');
      });

      try {
        const response = await getTimecard();
        expect(response).toBeUndefined();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Timecard Service');
        expect(error.message).toContain('getTimecard');
        expect(error.message).toContain('xyz');
      }
    });
  });

  describe('getTimePeriodTypes', () => {
    it('should use correct endpoint resources/time-period-types', async () => {
      api.get.mockImplementation(() =>
        Promise.resolve({
          data: getApiResponseWithItems(...MOCK_TIME_PERIOD_TYPES),
        })
      );

      const timePeriodTypes = await getTimePeriodTypes(TENANT_ID_PARAM);

      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining('resources/time-period-types'),
        TENANT_ID_PARAM
      );
      expect(timePeriodTypes.data.items.length).toBe(7);
    });

    it('should throw useful error containing throwing service and function when an error occurs', async () => {
      api.get.mockImplementation(() => {
        throw new Error('xyz');
      });

      try {
        const response = await getTimePeriodTypes(TENANT_ID_PARAM);
        expect(api.get).toHaveBeenCalledWith(
          expect.stringContaining('resources/time-period-types'),
          TENANT_ID_PARAM
        );
        expect(response).toBeUndefined();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Timecard Service');
        expect(error.message).toContain('getTimePeriodTypes');
        expect(error.message).toContain('xyz');
      }
    });
  });

  describe('getTimeEntries', () => {
    it('should return data correctly on success', async () => {
      api.get.mockImplementation(() =>
        Promise.resolve({ data: [timeEntryApiResponse] })
      );

      const response = await getTimeEntries();

      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining('api/v1/timecard'),
        undefined
      );
      expect(response.data[0].meta).toBeDefined();
      expect(response.data[0].items).toBeDefined();
      expect(response.data[0].items.length).toBeGreaterThan(0);
      expect(response.data).toStrictEqual([timeEntryApiResponse]);
    });

    it('should throw a useful error containing throwing service and function when an error occurs', async () => {
      api.get.mockImplementation(() => {
        throw new Error('xyz');
      });

      try {
        const response = await getTimeEntries();
        expect(response).toBeUndefined();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Timecard Service');
        expect(error.message).toContain('getTimeEntries');
        expect(error.message).toContain('xyz');
      }
    });
  });

  describe('updateTimeEntry', () => {
    it('should return data correctly on success', async () => {
      api.put.mockImplementation(() =>
        Promise.resolve({ data: [timeEntryApiResponse] })
      );

      const response = await updateTimeEntry(1, timeEntryApiResponse.items[0]);

      expect(response.data[0].meta).toBeDefined();
      expect(response.data[0].items).toBeDefined();
      expect(response.data[0].items.length).toBeGreaterThan(0);
      expect(response.data).toStrictEqual([timeEntryApiResponse]);
    });
  });

  describe('deleteTimeEntry', () => {
    it('should return 200 on success', async () => {
      api.delete.mockImplementation(() => Promise.resolve({ status: 200 }));

      const response = await deleteTimeEntry(123, TENANT_ID_PARAM);

      expect(api.delete).toHaveBeenCalledWith(
        expect.stringContaining('resources/time-entries/123'),
        TENANT_ID_PARAM
      );
      expect(response.status).toBeDefined();
    });

    it('should throw a useful error containing throwing service and function when an error occurs', async () => {
      api.delete.mockImplementation(() => {
        throw new Error('xyz');
      });

      try {
        const response = await deleteTimeEntry(123, TENANT_ID_PARAM);
        expect(response).toBeUndefined();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Timecard Service');
        expect(error.message).toContain('deleteTimeEntry');
        expect(error.message).toContain('xyz');
      }
    });
  });
});
