import {
  getTimecard,
  getTimeEntries,
  updateTimeEntry,
  getTimePeriodTypes,
} from './timecardService';
import api from '../core';
import {
  newTimeCardEntry,
  updatedTimeCardEntryStartTime,
} from '../../../mocks/mockData';

const {
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
  test('getTimecard returns data correctly on success', async () => {
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

  test('getTimecard uses correct endpoint api/v1/timecard', async () => {
    api.get.mockImplementation(() => Promise.resolve({ data: timecard }));

    await getTimecard();

    expect(api.get).toHaveBeenCalledWith(
      expect.stringContaining('api/v1/timecard'),
      undefined
    );
  });

  test('getTimecard throws useful error containing throwing service and function', async () => {
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

  test('getTimePeriodTypes uses correct endpoint resources/time-period-type', async () => {
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

  test('getTimePeriodTypes throws useful error containing throwing service and function', async () => {
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

  describe('updateTimeEntry', () => {
    it('should return data correctly on success', async () => {
      api.put.mockImplementation(() =>
        Promise.resolve({ data: [updatedTimeCardEntryStartTime] })
      );

      const response = await updateTimeEntry(
        1,
        updatedTimeCardEntryStartTime.items[0]
      );

      expect(response.data[0].meta).toBeDefined();
      expect(response.data[0].items).toBeDefined();
      expect(response.data[0].items.length).toBeGreaterThan(0);
      expect(response.data).toStrictEqual([updatedTimeCardEntryStartTime]);
    });

    it('should throw a useful error containing throwing service and function', async () => {
      api.put.mockImplementation(() => {
        throw new Error('xyz');
      });

      try {
        const response = await updateTimeEntry();
        expect(response).toBeUndefined();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Timecard Service');
        expect(error.message).toContain('updateTimeEntry');
        expect(error.message).toContain('xyz');
      }
    });
  });
});
