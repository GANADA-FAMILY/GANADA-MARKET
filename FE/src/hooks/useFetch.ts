import { AxiosResponse } from 'axios';
import { STATUS } from 'constants/statusCode';
import { useState, useEffect } from 'react';
import Payload from 'types/Form/Payload';
// T : request, D : response
interface useFetchProps<T, D> {
  api: (
    payload?: Payload<T>,
    pathValue?: string,
    params?: string,
  ) => Promise<AxiosResponse<D, any>>;
  payload?: Payload<T>;
  pathValue?: string;
  params?: string;
}

export default function useFetch<T, D>({
  api,
  payload,
  pathValue,
  params,
}: useFetchProps<T, D>) {
  const [state, setState] = useState<D | any>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const { data, status } = await api(payload, pathValue, params);
      if (status === STATUS.OK || status === STATUS.CREATED) setState(data);
    } catch (err) {
      setError(true);
    }
  };
  useEffect(() => {
    console.log(true);
    getData();
    setIsLoading(false);
  }, [error, isLoading]);

  return [state, error, isLoading];
}
