import { useState, useEffect } from 'react';
// import STATUS from 'constants/statusCode';

interface useFetchProps {
  type: any;
  payload: any;
}

function useFetch({ type, payload }: useFetchProps) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, []);
  return {};
}

export default useFetch;
