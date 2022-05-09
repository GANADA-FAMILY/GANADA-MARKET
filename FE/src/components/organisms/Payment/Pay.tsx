import React from 'react';
import styled from '@emotion/styled';
import Container from '../../layouts/Payment/Container';
import Title from '../../atoms/Payment/Title';
import Button from '../../atoms/Main/Button';

interface Props {
  children: React.ReactNode;
}

function Pay() {
  const onClick = () => {
    console.log('결제하기');
  };
  return (
    <Container>
      <Title>결제 방법</Title>
      <Button onClick={onClick}>결제하기</Button>
    </Container>
  );
}

export default Pay;
