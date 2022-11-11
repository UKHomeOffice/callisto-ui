import { waitFor } from '@testing-library/react';
import { validateServiceErrors } from './ApiUtils';

describe('ApiUtils', () => {
  let serviceError;
  const setServiceError = jest.fn((serviceErrorData) => {
    serviceError = serviceErrorData;
  });

  it('should set the service error to false when no error is thrown', async () => {
    serviceError = {
      hasError: true,
      recoverable: true,
    };
    const serviceFunction = () => {};
    validateServiceErrors(setServiceError, serviceFunction);

    await waitFor(() => {
      expect(setServiceError).toHaveBeenCalledWith({
        hasError: false,
      });
      expect(serviceError.hasError).toEqual(false);
    });
  });

  it('should set the service error and recoverable to true when an error is thrown', async () => {
    serviceError = {
      hasError: false,
    };
    const serviceFunction = () => {
      throw new Error();
    };
    validateServiceErrors(setServiceError, serviceFunction);

    await waitFor(() => {
      expect(setServiceError).toHaveBeenCalledWith({
        hasError: true,
        recoverable: true,
      });
      expect(serviceError.hasError).toEqual(true);
    });
  });

  it('should set the service error to true and set recoverable to what was provided', async () => {
    serviceError = {
      hasError: false,
    };
    const serviceFunction = () => {
      throw new Error();
    };
    validateServiceErrors(setServiceError, serviceFunction, () => {}, false);

    await waitFor(() => {
      expect(setServiceError).toHaveBeenCalledWith({
        hasError: true,
        recoverable: false,
      });
      expect(serviceError.hasError).toEqual(true);
      expect(serviceError.recoverable).toEqual(false);
    });
  });

  describe('handleCustomErrors', () => {
    it('should set the service error to false if handleCustomErrors returns true', async () => {
      serviceError = {
        hasError: true,
      };

      const serviceFunction = () => {
        throw new Error();
      };

      const handleCustomErrors = () => {
        return true;
      };

      validateServiceErrors(
        setServiceError,
        serviceFunction,
        handleCustomErrors
      );

      await waitFor(() => {
        expect(setServiceError).toHaveBeenCalledWith({
          hasError: false,
        });
        expect(serviceError.hasError).toEqual(false);
      });
    });

    it('should set the service error to true if handleCustomErrors returns false', async () => {
      serviceError = {
        hasError: false,
      };

      const serviceFunction = () => {
        throw new Error();
      };

      const handleCustomErrors = () => {
        return false;
      };

      validateServiceErrors(
        setServiceError,
        serviceFunction,
        handleCustomErrors
      );

      await waitFor(() => {
        expect(setServiceError).toHaveBeenCalledWith({
          hasError: true,
          recoverable: true,
        });
        expect(serviceError.hasError).toEqual(true);
      });
    });
  });
});
