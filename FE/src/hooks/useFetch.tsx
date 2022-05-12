import { useState, useEffect } from 'react';
import STATUS from 'constants/statusCode';

interface useFetch {
  type: any;
  payload: any;
}

function useFetch({ type, payload }: useFetch) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  return {};
}
