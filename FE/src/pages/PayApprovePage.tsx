import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import payAPI from 'api/payAPI';
import PayCompleteForm from 'types/Form/PayCompleteForm';
import styled from '@emotion/styled';
import { LinkTo } from 'components/atoms/Main';

function PayResultPage() {
  const [token] = useSearchParams();
  const pgToken = token.get('pg_token');
  useEffect(() => {
    async function CompletePay(payload: PayCompleteForm) {
      payAPI.PayComplete(payload);
    }
    const painfo = window.localStorage.getItem('completePayInfo');
    if (painfo && pgToken) {
      const { orderId, tid } = JSON.parse(painfo);
      CompletePay({ orderId, tid, pgToken });
    }
  }, []);
  return (
    <Container>
      <Result>결제가 완료됐습니다.</Result>
      <ToHome to="/">홈으로 돌아가기</ToHome>
    </Container>
  );
}

export default PayResultPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 35rem);
  width: 100%;
  p {
    font-size: 2rem;
  }
`;

const Result = styled.div`
  font-size: 5rem;
  white-space: nowrap;
  font-weight: 1000;
  margin-bottom: 2rem;
`;

const ToHome = styled(LinkTo)`
  font-size: 3rem;
  color: #22222280;
`;
