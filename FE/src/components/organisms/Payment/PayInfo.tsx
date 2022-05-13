import React from 'react';
import styled from '@emotion/styled';
import { priceComma } from 'functions';
import Container from '../../layouts/Payment/Container';
import Title from '../../atoms/Payment/Title';
import theme from '../../../styles/theme';

interface Props {
  price: number;
}

function PayInfo({ price }: Props) {
  const strPrice = priceComma(price);
  return (
    <Container>
      <Title>최종 주문 정보</Title>
      <Price>{strPrice}</Price>
    </Container>
  );
}

const Price = styled(Title)`
  color: ${theme.color.red};
  text-align: end;
  line-height: 3rem;
`;

export default PayInfo;
