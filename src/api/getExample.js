import { useEffect, useState } from 'react';
import api from './core';

const useGetExample = (date, token, entries, update, id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);

      api
        .get(`/api/v1/resources/artists?filter=artist_id>5`, token)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    };
    if (!entries) fetchData();
  }, [entries, date, token, update, id]);

  return { error, loading, data };
};

export default useGetExample;
