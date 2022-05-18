import React from 'react';
import styled from '@emotion/styled';
import Address from 'types/Entity/UserAPI/Address';
import Auction from 'types/Entity/Auction';
import Pay from '../organisms/Payment/Pay';
import DeliveryInfo from '../organisms/Payment/DeliveryInfo';
import ProductInfo from '../organisms/Payment/ProductInfo';
import PayInfo from '../organisms/Payment/PayInfo';

interface Props {
  auction: Auction;
  delivery: Address;
}

function PaymentTemplate({ auction, delivery }: Props) {
  return (
    <Container>
      <Wrapper>
        <ProductInfo data={auction.product} />
        <DeliveryInfo data={delivery} />
        <PayInfo price={13000} />
        <Pay />
      </Wrapper>
    </Container>
  );
}

export default PaymentTemplate;

const Container = styled.main`
  width: 100%;
  height: 100%;
  background-color: #fafafa;
`;

const Wrapper = styled.section`
  width: 78rem;
  padding: 2rem 4rem 16rem;
  margin: auto;
`;
