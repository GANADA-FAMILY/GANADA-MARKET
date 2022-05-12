import React from 'react';
import styled from '@emotion/styled';
import Text from '../../atoms/Main/Text';
import Button from '../../atoms/Main/Button';
import Container from '../../layouts/Payment/Container';
import Title from '../../atoms/Payment/Title';

interface Props {
  children: React.ReactNode;
}

function DeliveryInfo() {
  const ChangeAdd = () => {
    console.log('주소변경');
  };
  return (
    <Container>
      <Title>배송주소</Title>
      <Wrapper>
        <Dl>
          <Item>
            <Dt>받는 분</Dt>
            <Dd>헤더1</Dd>
          </Item>
          <Item>
            <Dt>연락처</Dt>
            <Dd>데이터</Dd>
          </Item>
          <Item>
            <Dt>배송 주소</Dt>
            <Dd>데이터</Dd>
          </Item>
        </Dl>
        <Button onClick={ChangeAdd}>변경</Button>
      </Wrapper>
    </Container>
  );
}

export default DeliveryInfo;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.2rem;
`;
const Dl = styled.dl`
  width: 100%;
`;

const Dt = styled.dt`
  float: left;
  color: rgba(34, 34, 34, 0.5);
  width: 8rem;
`;
const Dd = styled.dd`
  /* float: right; */
`;
const Item = styled.div`
  min-height: 2.6rem;
  line-height: 1.7rem;
`;
