import { useEffect, useState } from 'react';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import { fetchUserByToken } from 'state/reducers/UserSlice';

export default function useAuth() {
  const dispatch = useRootDispatch();
  const user = useRootSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    const data = await dispatch(fetchUserByToken());
  };
  useEffect(() => {
    getData();
    setLoading(false);
  }, []);

  return { user, loading, dispatch };
}
