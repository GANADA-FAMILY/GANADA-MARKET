import React, { useState } from 'react';
import styled from '@emotion/styled';
import Container from '../../layouts/Payment/Container';
import Title from '../../atoms/Payment/Title';
import SubTitle from '../../atoms/Payment/SubTitle';
import PayMethod from '../../molecules/Payment/PayMethod';
import GrayText from '../../atoms/Payment/GrayText';

interface Props {
  children: React.ReactNode;
}

function Pay() {
  const [select, setSelect] = useState('');
  const onClick = () => {
    console.log('결제하기');
  };
  return (
    <Container>
      <Title>결제 방법</Title>
      <TextWrap>
        <SubTitle fontSize="1.5rem">일반 결제</SubTitle>
        <GrayText margin="0 0 0 1rem">일시불</GrayText>
      </TextWrap>
      <Wrapper>
        {bank.map((item) => {
          return (
            <PayMethod
              key={item.bank}
              item={item}
              checked={select === item.bank}
              onClick={() => setSelect(item.bank)}
            />
          );
        })}
      </Wrapper>
      <Button onClick={onClick}>
        <Text>결제하기</Text>
      </Button>
    </Container>
  );
}

export default Pay;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const TextWrap = styled.div`
  display: flex;
  padding: 1.6rem 0;
`;

const Button = styled.button`
  width: 100%;
  height: 5.2rem;
  background-color: #ebebeb;
  border-radius: 1rem;
  border: none;
`;

const Text = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: #fff;
`;

const bank = [
  {
    bank: '카카오페이',
    src: './image/kakaopay.png',
  },
  {
    bank: '네이버페이',
    src: './image/naverpay.png',
  },
  {
    bank: '토스',
    src: './image/toss.png',
  },
  {
    bank: '페이코',
    src: './image/payco.png',
  },
];
