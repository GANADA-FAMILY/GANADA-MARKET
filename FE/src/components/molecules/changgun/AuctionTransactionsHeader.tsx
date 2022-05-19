import styled from 'styled-components';
import { Text, Button } from 'components/atoms/changgun';

interface AuctionTransactionsHeaderProps {
  handleSetTimeZone: (value: '1개월' | '3개월' | '6개월' | '1년') => void;
  timeZone: '1개월' | '3개월' | '6개월' | '1년';
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`;

const SelectTimeZone = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0.3rem 0.5rem;
  background-color: #efefef;
  border-radius: 0.5rem;
`;

function AuctionTransactionsHeader({
  handleSetTimeZone,
  timeZone,
}: AuctionTransactionsHeaderProps) {
  return (
    <Wrapper>
      <Text size="large" bold color="dark">
        시세
      </Text>
      <SelectTimeZone>
        <Button
          onClick={() => handleSetTimeZone('1개월')}
          padding="0.5rem 2rem"
          isActive={timeZone === '1개월'}
          activeStyle="background: #fff"
        >
          1개월
        </Button>
        <Button
          onClick={() => handleSetTimeZone('3개월')}
          padding="0.5rem 2rem"
          isActive={timeZone === '3개월'}
          activeStyle="background: #fff"
        >
          3개월
        </Button>
        <Button
          onClick={() => handleSetTimeZone('6개월')}
          padding="0.5rem 2rem"
          isActive={timeZone === '6개월'}
          activeStyle="background: #fff"
        >
          6개월
        </Button>
        <Button
          onClick={() => handleSetTimeZone('1년')}
          padding="0.5rem 2rem"
          isActive={timeZone === '1년'}
          activeStyle="background: #fff"
        >
          1년
        </Button>
      </SelectTimeZone>
    </Wrapper>
  );
}

export { AuctionTransactionsHeader };
