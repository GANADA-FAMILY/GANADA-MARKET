import { AsyncThunkAction, Selector } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import Payload from 'types/Form/Payload';

interface useAsyncProps<T, D> {
  // payload?: Payload<T>;
  // pathValue?: string;
  // params?: string;
  thunk: AsyncThunkAction<Payload<T>, D, any>;
  selector: any;
}
export default function useAsync<T, D>({
  thunk,
  selector,
}: useAsyncProps<T, D>) {
  const dispatch = useRootDispatch();
  // const data = useRootSelector((state) => state.user.user);
  const data = selector;
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(thunk);
    // setLoading(false);
  }, []);

  return { data, dispatch };
}
