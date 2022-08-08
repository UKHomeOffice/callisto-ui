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
          dispatch({ type: 'success', data });
        })
        .catch((error) => {
          dispatch({ type: 'error', error });
        });
    } catch (error) {
      console.log('error - log');
    }
  }, [service]);
  return [state.loading, state.data, state.error];
};

export default useApiCall;
