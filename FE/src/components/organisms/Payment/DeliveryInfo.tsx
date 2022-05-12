import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import Button from '../../atoms/Main/Button';
import Container from '../../layouts/Payment/Container';
import Title from '../../atoms/Payment/Title';

interface Props {
  children: React.ReactNode;
}

axios.defaults.baseURL =
  'http://jk-f3f2784a195fe7eb.elb.ap-northeast-2.amazonaws.com:8080/swagger-ui/#/';
function DeliveryInfo() {
  const [adress, setAdress] = useState({
    adress: '',
  });
  // 배송정보 가져오기
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.get('/user/addressbook', {
        headers: {
          Authorization: `${token}`,
        },
      });
    }
  }, []);

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
