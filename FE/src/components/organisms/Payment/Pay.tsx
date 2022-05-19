import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { selectPayInfo, setPayMethod } from 'state/reducers/PaySlice';
import payAPI from 'api/payAPI';
import Container from 'components/layouts/Payment/Container';
import Title from 'components/atoms/Payment/Title';
import SubTitle from 'components/atoms/Payment/SubTitle';
import PayMethod from 'components/molecules/Payment/PayMethod';
import GrayText from 'components/atoms/Payment/GrayText';

interface ButtonProps {
  disabled: boolean;
}

function Pay() {
  const [select, setSelect] = useState('');
  const payload = useSelector(selectPayInfo);
  const dispatch = useDispatch();
  const onClick = async () => {
    window.localStorage.removeItem('completePayInfo');
    const res = await payAPI.PayReady(payload);
    const { orderId, redirectURL, tid } = res.data;
    console.log(orderId, redirectURL, tid);
    window.localStorage.setItem(
      'completePayInfo',
      JSON.stringify({
        orderId,
        tid,
      }),
    );
    alert('결제페이지로 이동합니다.');
    window.location.href = redirectURL;
  };
  const painfo = window.localStorage.getItem('completePayInfo');
  const selectHandler = (bank: string) => {
    setSelect(bank);
    dispatch(setPayMethod(bank));
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
              checked={select === item.alt}
              onClick={() => selectHandler(item.alt)}
            />
          );
        })}
      </Wrapper>
      <Button disabled={select === ''} onClick={onClick}>
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

const Button = styled.button<ButtonProps>`
  width: 100%;
  height: 5.2rem;
  border-radius: 1rem;
  border: none;
  background-color: #ef6253;
  cursor: pointer;
  :disabled {
    background-color: #ebebeb;
    cursor: default;
  }
`;

const Text = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: #fff;
`;

const bank = [
  {
    bank: '카카오페이',
    src: '/images/kakaopay.png',
    alt: 'kakaopay',
  },
  {
    bank: '네이버페이',
    src: '/images/naverpay.png',
    alt: 'naverpay',
  },
  {
    bank: '토스',
    src: '/images/toss.png',
    alt: 'toss',
  },
  {
    bank: '페이코',
    src: '/images/payco.png',
    alt: 'payco',
  },
];
