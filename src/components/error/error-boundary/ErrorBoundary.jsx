import { useEffect, useState } from 'react';
import { useApplicationContext } from '../../../context/ApplicationContext';
import ApplicationError from '../ApplicationError';
import ServiceError from '../ServiceError';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';

/**
 * A wrapper for the ReactErrorBoundary functional component that also captures service errors.
 */
const ErrorBoundary = (props) => {
  const { serviceError } = useApplicationContext();
  const [appError, setAppError] = useState(false);

  useEffect(() => {
    if (!appError && serviceError.hasError && !serviceError.recoverable) {
      setAppError(true);
    }
  }, [serviceError]);

  let error;
  if (appError) error = <ApplicationError />;
  else if (serviceError.hasError) error = <ServiceError />;

  return (
    <ReactErrorBoundary FallbackComponent={ApplicationError}>
      {error}
      {!appError && props.children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;

ErrorBoundary.propTypes = {
  children: PropTypes.any,
};
