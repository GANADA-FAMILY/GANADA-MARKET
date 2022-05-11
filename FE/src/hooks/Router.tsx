import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Router() {
  const navigate = useNavigate();

  return useMemo(() => {
    return {
      push(path: string) {
        navigate(path);
      },
    };
  }, [navigate]);
}
