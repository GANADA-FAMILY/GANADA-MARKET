import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from '../../atoms/changgun';
import { numberWithCommas } from '../../../functions';

interface AuctionHeaderProps {
  brandName: string;
  productName: string;
  price: number;
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 2rem;
`;

const HeaderUpper = styled.div``;

const HeaderLower = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3rem;
  align-self: stretch;
`;

const PriceInfo = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

function AuctionHeader({ brandName, productName, price }: AuctionHeaderProps) {
  return (
    <Header>
      <HeaderUpper>
        <Link to="/">
          <Text size="xlarge" color="dark" pointer underLine bold>
            {brandName.toUpperCase()}
          </Text>
        </Link>
      </HeaderUpper>
      <HeaderLower>
        <Text size="large" bold color="dark">
          {productName}
        </Text>
        <PriceInfo>
          <Text>현재가격</Text>
          <Text size="xlarge" bold color="dark">
            {`${numberWithCommas(price)}원`}
          </Text>
        </PriceInfo>
      </HeaderLower>
    </Header>
  );
}

export { AuctionHeader };
