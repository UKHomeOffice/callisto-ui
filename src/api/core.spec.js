import api from './core';

jest.mock('./core');

describe('Core API', () => {
  test('get returns data', async () => {
    api.get.mockResolvedValue({ data: [] });

    const response = await api.get('/api/test');

    expect(response.data).toBeDefined();
  });

  test('post is successful', async () => {
    api.post.mockResolvedValue({ data: [] });

    const response = await api.post('/api/test', 'id=1', '{ id: 1}');

    expect(response.data).toBeDefined();
    expect(api.post).toHaveBeenCalledWith('/api/test', 'id=1', '{ id: 1}');
  });

  test('put is successful', async () => {
    api.put.mockResolvedValue({ data: [] });

    const response = await api.put('/api/test', '', '{ id: 2}');

    expect(response.data).toBeDefined();
    expect(api.put).toBeCalledWith('/api/test', '', '{ id: 2}');
  });
});
