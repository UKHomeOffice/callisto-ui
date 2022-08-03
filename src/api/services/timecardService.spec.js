import { getTimecard } from './timecardService';
import api from '../core';

jest.mock('../core');

// jest.mock('@react-keycloak/web', () => ({
//   useKeycloak: () => [{}, mockInitialized],
// }));

describe('Timecard Service', () => {
  test('getTimecard returns data correctly on success', async () => {
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

    api.get.mockImplementation(() => Promise.resolve({ data: timecard }));

    const response = await getTimecard();

    expect(response.data[0].meta).toBeDefined();
    expect(response.data[0].items).toBeDefined();
    expect(response.data[0].items.length).toBeGreaterThan(0);
    expect(response.data).toStrictEqual(timecard);
  });

  test('getTimecard throws error', async () => {
    api.get.mockImplementation(() => {
      throw new Error('xyz');
    });

    try {
      const response = await getTimecard();
      expect(response).toBeUndefined();
    } catch (error) {
      expect.assertions(2);
      expect(error).toBeDefined();
      expect(error.message).toContain('xyz');
    }
  });
});
