import React from 'react';
import styled from '@emotion/styled';
import Pay from '../organisms/Payment/Pay';
import DeliveryInfo from '../organisms/Payment/DeliveryInfo';
import ProductInfo from '../organisms/Payment/ProductInfo';
import PayInfo from '../organisms/Payment/PayInfo';

interface Props {
  data: {
    id: number;
    name: string;
  };
}

function PaymentTemplate({ data }: Props) {
  return (
    <Container>
      <Wrapper>
        <ProductInfo data={data} />
        <DeliveryInfo />
        <PayInfo />
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
