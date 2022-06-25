import { useState, useEffect } from "react";

export default function useFetch(dataType) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_BASE_URL + dataType
        );
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          throw response;
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [dataType]);

  return { data, error, loading };
}
