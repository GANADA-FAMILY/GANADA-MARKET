import { useState, useEffect } from 'react';

function useSetTime(time: number) {
  const [state, setState] = useState(time);
  useEffect(() => {
    if (state === 0) return undefined;
    const oneSecond = setTimeout(() => {
      setState((prevState) => prevState - 1);
    }, 1000);

    return () => clearTimeout(oneSecond);
  }, [state]);
  return state;
}

export default useSetTime;
