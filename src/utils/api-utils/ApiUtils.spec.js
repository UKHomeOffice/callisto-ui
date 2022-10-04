import { waitFor } from '@testing-library/react';
import { validateServiceErrors } from './ApiUtils';

describe('ApiUtils', () => {
  let serviceError;
  const setServiceError = jest.fn((flag) => {
    serviceError = flag;
  });

  it('should set the service error to false when no error is thrown', async () => {
    serviceError = true;
    const serviceFunction = () => {};
    validateServiceErrors(setServiceError, serviceFunction);

    await waitFor(() => {
      expect(setServiceError).toHaveBeenCalledWith(false);
      expect(serviceError).toEqual(false);
    });
  });

  it('should set the service error to true when an error is thrown', async () => {
    serviceError = false;
    const serviceFunction = () => {
      throw new Error();
    };
    validateServiceErrors(setServiceError, serviceFunction);

    await waitFor(() => {
      expect(setServiceError).toHaveBeenCalledWith(true);
      expect(serviceError).toEqual(true);
    });
  });
});
