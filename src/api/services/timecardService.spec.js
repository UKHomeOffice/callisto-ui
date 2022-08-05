import { getTimecard, getHelloWorld } from './timecardService';
import api from '../core';

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

  test('getHelloWorld returns data', async () => {
    api.get.mockImplementation(() => Promise.resolve({ data: 'Hello World' }));

    const response = await getHelloWorld();

    expect(response.data).toBeDefined();
    expect(response.data.toLowerCase()).toContain('hello world');
  });

  test('getHelloWorld uses correct endpoint api/v1/', async () => {
    api.get.mockImplementation(() => Promise.resolve({ data: 'Hello World' }));

    await getHelloWorld();

    expect(api.get).toHaveBeenCalledWith(expect.stringContaining('api/v1/'));
  });

  test('getHelloWorld throws error', async () => {
    api.get.mockImplementation(() => {
      throw new Error('xyz');
    });

    try {
      const response = await getHelloWorld();
      expect(response).toBeUndefined();
    } catch (error) {
      expect.assertions(2);
      expect(error).toBeDefined();
      expect(error.message).toContain('xyz');
    }
  });
});
