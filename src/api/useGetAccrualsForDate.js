import { useEffect, useState } from 'react';
import api from './core';

const useGetAccrualsForDate = (date, token, id) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    api
      .get(
        `/api/callisto-accruals-service/tracking/person/${id}/${date}`,
        token
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [date, token, id]);
  return { error, loading, data };
};

export default useGetAccrualsForDate;
