import useApiCall from './useApiCall';
import { renderHook } from '@testing-library/react-hooks';

const services = require('./services/timecardService');
const mockGetHelloWorld = jest.spyOn(services, 'getHelloWorld');

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
    mockGetHelloWorld.mockImplementation(() => Promise.resolve(matchObj));
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
    mockGetHelloWorld.mockImplementation(() => Promise.reject(matchObj));
    const { result, waitForNextUpdate } = renderHook(() =>
      useApiCall(mockGetHelloWorld)
    );

    expect(result.current).toMatchObject([true, null, null]);
    await waitForNextUpdate();
    expect(result.current).toMatchObject([true, null, matchObj]);
  });
});
