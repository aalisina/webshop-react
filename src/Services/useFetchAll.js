import { useState, useEffect, useRef } from "react";

export default function useFetchAll(urls) {
  const prevUrlsRef = useRef([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if the urls have changed
    if (arraysEqual(prevUrlsRef.current, urls)) {
      setLoading(false);
      return;
    }
    prevUrlsRef.current = urls;
    const promises = urls.map((url) =>
      fetch(process.env.REACT_APP_API_BASE_URL + "products/" + url).then(
        (response) => {
          if (response.ok) return response.json();
          throw response;
        }
      )
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
    // if add the urls dependecy, the effect will be called every time the urls
    // change and will fetch the date over and over again
    // causing an infinite loop because the component is rendered over and over again
  }, [urls]);

  return { data, loading, error };
}

const arraysEqual = (array1, array2) => {
  return (
    array1.length === array2.length &&
    array1.every((element, index) => element === array2[index])
  );
};
