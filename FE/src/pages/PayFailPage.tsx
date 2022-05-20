import React from 'react';
import { useSelector } from 'react-redux';
import { selectPayInfo } from 'state/reducers/PaySlice';
import styled from '@emotion/styled';
import { LinkTo } from 'components/atoms/Main';

function PayFailPage() {
  const { auctionId } = useSelector(selectPayInfo);
  return (
    <Container>
      <Result>결제를 실패했습니다.</Result>
      <ToHome to={`/auction/${auctionId}`}>다시 돌아가기</ToHome>
    </Container>
  );
}

export default PayFailPage;

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
