import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPayInfo } from 'state/reducers/PaySlice';
import styled from '@emotion/styled';

function PayResultPage() {
  const payInfo = useSelector(selectPayInfo);
  return (
    <Container>
      <Result>{payInfo}</Result>
    </Container>
  );
}

export default PayResultPage;

const Container = styled.div`
  display: table;
  height: calc(100vh - 35rem);
  width: 100%;
`;

const Result = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 5rem;
  white-space: nowrap;
  font-weight: 1000;
`;
