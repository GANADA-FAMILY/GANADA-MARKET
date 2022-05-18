import { AxiosResponse } from 'axios';
import { STATUS } from 'constants/statusCode';
import React, { useState, useEffect } from 'react';
import Payload from 'types/Form/Payload';

interface useFetchProps<T> {
  api: (payload?: Payload<T>) => Promise<AxiosResponse<any, any>>;
  payload?: Payload<T>;
}

export default function useFetch<T>({ api, payload }: useFetchProps<T>) {
  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    try {
      const { data, status } =
        payload !== undefined ? await api(payload) : await api();
      if (status === STATUS.OK || status === STATUS.CREATED) setInfo(data);
    } catch (err) {
      setError(true);
    }
  };
  useEffect(() => {
    getData();
    setIsLoading(false);
    // onChangeLoading();
  }, [error, isLoading]);

  // return [values, errors, isLoading, handleChange, handleSubmit];
  return [info, error, isLoading];
}
