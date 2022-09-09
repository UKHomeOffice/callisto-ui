import {
  getTimecard,
  getTimeEntries,
  getTimePeriodTypeById,
  getTimePeriodTypes,
} from './timecardService';
import { newTimeCardEntry } from '../../../mocks/mockData';
import api from '../core';

const {
  shiftTimeCardPeriodType: MOCK_SHIFT_TIME_PERIOD_TYPE,
  timeCardPeriodTypes: MOCK_TIME_PERIOD_TYPES,
} = require('../../../mocks/mockData');
jest.mock('../core');

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

    it('should throw useful error containing throwing service and function', async () => {
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
    it('should use correct endpoint resources/time-period-type', async () => {
      api.get.mockImplementation(() =>
        Promise.resolve({ data: MOCK_TIME_PERIOD_TYPES })
      );

      const timePeriodTypes = await getTimePeriodTypes(TENANT_ID_PARAM);

      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining('resources/time-period-type'),
        TENANT_ID_PARAM
      );
      expect(timePeriodTypes.data.items.length).toBe(7);
    });

    it('should throw useful error containing throwing service and function', async () => {
      api.get.mockImplementation(() => {
        throw new Error('xyz');
      });

      try {
        const response = await getTimePeriodTypes(TENANT_ID_PARAM);
        expect(api.get).toHaveBeenCalledWith(
          expect.stringContaining('resources/time-period-type'),
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
        Promise.resolve({ data: [newTimeCardEntry] })
      );

      const response = await getTimeEntries();

      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining('api/v1/timecard'),
        undefined
      );
      expect(response.data[0].meta).toBeDefined();
      expect(response.data[0].items).toBeDefined();
      expect(response.data[0].items.length).toBeGreaterThan(0);
      expect(response.data).toStrictEqual([newTimeCardEntry]);
    });

    it('should throw a useful error containing throwing service and function', async () => {
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
});
