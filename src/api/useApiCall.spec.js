import useApiCall from './useApiCall';
import { renderHook } from '@testing-library/react-hooks';

describe('useApiCall', () => {
  it('should return correct response from a get call', async () => {
    const matchObj = {
      data: 'Hello World',
      status: 200,
      statusText: 'OK',
    };
    const mockGet = jest.fn().mockResolvedValue(matchObj);
    const { result, waitForNextUpdate } = renderHook(() => useApiCall(mockGet));

    expect(result.current).toMatchObject([true, null, null]);
    await waitForNextUpdate();
    expect(result.current).toMatchObject([false, matchObj, null]);
  });

  it('should return correct reject response from a get call', async () => {
    const matchObj = {
      status: 404,
      statusText: 'Not Found',
    };
    const mockGet = jest.fn().mockRejectedValue(matchObj);
    const { result, waitForNextUpdate } = renderHook(() => useApiCall(mockGet));

    expect(result.current).toMatchObject([true, null, null]);
    await waitForNextUpdate();
    expect(result.current).toMatchObject([false, null, matchObj]);
  });
});
