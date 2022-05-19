import { useState, useEffect } from 'react';
import useSetTime from './useSetTime';

function useSetPrice(
  time: number,
  cycle: number,
  price: number,
  earlyTime: number,
) {
  const realTime = useSetTime(time);
  const [state, setState] = useState(price);

  useEffect(() => {}, [realTime]);

  return state;
}

export default useSetPrice;
