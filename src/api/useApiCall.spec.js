import useApiCall from './useApiCall';
import { renderHook } from '@testing-library/react-hooks';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useApiCall', () => {
  it('useApiCall should return correct response from getHelloWorld', async () => {
    const matchObj = {
      data: 'Hello World',
      status: 200,
      statusText: 'OK',
    };
    const mockGetHelloWorld = jest.fn().mockResolvedValue(matchObj);
    const { result, waitForNextUpdate } = renderHook(() =>
      useApiCall(mockGetHelloWorld)
    );

    expect(result.current).toMatchObject([true, null, null]);
    await waitForNextUpdate();
    expect(result.current).toMatchObject([false, matchObj, null]);
  });

  it('useApiCall should return correct reject response from getHelloWorld', async () => {
    const matchObj = {
      status: 404,
      statusText: 'Not Found',
    };
    const mockGetHelloWorld = jest.fn().mockRejectedValue(matchObj);
    const { result, waitForNextUpdate } = renderHook(() =>
      useApiCall(mockGetHelloWorld)
    );

    expect(result.current).toMatchObject([true, null, null]);
    await waitForNextUpdate();
    expect(result.current).toMatchObject([false, null, matchObj]);
  });
});
