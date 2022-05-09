import React from 'react';
import styled from '@emotion/styled';
import Container from '../../layouts/Payment/Container';
import Title from '../../atoms/Payment/Title';

interface Props {
  children: React.ReactNode;
}

function PayInfo() {
  return (
    <Container>
      <Title>최종 주문 정보</Title>
    </Container>
  );
}

export default PayInfo;
