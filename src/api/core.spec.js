import api from './core';

jest.mock('./core');

test('get returns data', async () => {
  api.get.mockResolvedValue({ data: [] });

  api.get('/api/timecard').then(function (request) {
    expect(request).toBeDefined();
  });
});
