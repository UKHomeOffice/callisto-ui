import { useEffect, useState } from 'react';
import api from './core';

const handleClick = () => {
  event.preventDefault();
};

const useGetAccrualsForDate2 = (date, token, id) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  handleClick();

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

export default useGetAccrualsForDate2;
