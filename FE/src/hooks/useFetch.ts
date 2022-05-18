import { AxiosResponse } from 'axios';
import { STATUS } from 'constants/statusCode';
import { useState, useEffect } from 'react';
import Payload from 'types/Form/Payload';

interface useFetchProps<T> {
  api: (
    payload?: Payload<T>,
    pathValue?: string,
    params?: string,
  ) => Promise<AxiosResponse<any, any>>;
  payload?: Payload<T>;
  pathValue?: string;
  params?: string;
}

export default function useFetch<T>({
  api,
  payload,
  pathValue,
  params,
}: useFetchProps<T>) {
  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    try {
      const { data, status } = await api(payload, pathValue, params);
      if (status === STATUS.OK || status === STATUS.CREATED) setInfo(data);
    } catch (err) {
      setError(true);
    }
  };
  useEffect(() => {
    getData();
    setIsLoading(false);
  }, [error, isLoading]);

  return [info, error, isLoading];
}
