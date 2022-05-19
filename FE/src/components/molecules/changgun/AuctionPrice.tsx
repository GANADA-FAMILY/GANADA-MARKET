import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Text } from 'components/atoms/changgun';
import { numberWithCommas } from '../../../functions';

interface AuctionPriceProps {
  initialTimer: number;
  currentPrice: number;
  depreciation: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

const Pane = styled.div`
  display: flex;
  justify-content: space-between;
`;

function AuctionPrice({
  initialTimer,
  currentPrice,
  depreciation,
}: AuctionPriceProps) {
  const [hour, setHour] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  // time은 초단위로 설정
  const time = useRef(initialTimer);
  const timerId: { current: any } = useRef();

  function pad(num: number, size: number) {
    let numString = num.toString();
    while (numString.length < size) numString = `0${numString}`;
    return numString;
  }

  useEffect(() => {
    timerId.current = setInterval(() => {
      const secString = pad(time.current % 60, 2);
      const minString = pad(Math.floor((time.current / 60) % 60), 2);
      const hourString = pad(Math.floor(time.current / 60 / 60), 2);
      setSec(secString);
      setMin(minString);
      setHour(hourString);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, [time]);

  useEffect(() => {
    // 타이머가 완료 됬을때..
    if (time.current <= 0) {
      clearInterval(timerId.current);
      window.location.reload();
    }
  }, [sec]);

  return (
    <Wrapper>
      <Pane>
        <Text>다음 거래 가격</Text>
        <Text>{`${numberWithCommas(currentPrice - depreciation)}원`}</Text>
      </Pane>
      <Pane>
        <Text>남은 시각</Text>
        <Text>{`${hour}:${min}:${sec}`}</Text>
      </Pane>
    </Wrapper>
  );
}

export { AuctionPrice };
