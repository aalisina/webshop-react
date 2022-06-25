import { useState, useEffect } from "react";

export default function useFetch(dataType) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
}
