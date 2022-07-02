import { useState, useEffect, useRef } from "react";

export default function useFetch(dataType) {
  const isMountedRef = useRef(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMountedRef.current = true;
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

    // Any function that is returned will be called when the component is unmounted
    return () => {
      isMountedRef.current = false;
    };
  }, [dataType]);

  return { data, error, loading };
}
