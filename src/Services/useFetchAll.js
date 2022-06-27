import { useState, useEffect } from "react";

export default function useFetch(products) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const promises = products.map((p) => {
      fetch(`${process.env.REACT_APP_API_BASE_URL}products/${p.id}`).then(
        (res) => {
          if (res.ok) return res.json();
          throw res;
        }
      );
    });

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.log(e);
        setError(e);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loading };
}
