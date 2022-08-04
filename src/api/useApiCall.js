import { useReducer, useEffect } from 'react';
import { apiCallReducer } from './apiCallReducer';

const initialApiState = {
  loading: false,
  data: null,
  error: null,
};

const useApiCall = (service) => {
  const [state, dispatch] = useReducer(apiCallReducer, initialApiState);

  useEffect(() => {
    dispatch({ type: 'loading' });
    try {
      service()
        .then((data) => {
          console.log('--- called service got data: ' + data + ' dispatching');
          dispatch({ type: 'success', data });
        })
        .catch((error) => {
          console.log(
            '--- called service got ERROR: ' + error + ' dispatching'
          );
          dispatch({ type: 'error', error });
        });
    } catch (error) {
      console.log('error - log');
    }
  }, [service]);
  console.log(
    'useApiCall ' +
      service.name +
      '  state: ' +
      [state.loading, state.data, state.error]
  );
  return [state.loading, state.data, state.error];
};

export default useApiCall;
