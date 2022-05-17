import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Address from 'types/Entity/Address';
import userAPI from '../../../api/userAPI';
import Button from '../../atoms/Main/Button';
import Container from '../../layouts/Payment/Container';
import Title from '../../atoms/Payment/Title';

function DeliveryInfo() {
  const [adress, setAdress] = useState<Address>();
  useEffect(() => {
    userAPI
      .getAddressbook()
      .then((res) => {
        setAdress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const ChangeAdd = () => {
    window.alert('구현중입니다.');
  };
  return (
    <Container>
      <Title>배송주소</Title>
      {adress && (
        <Wrapper>
          <Dl>
            <Item>
              <Dt>받는 분</Dt>
              <Dd>{adress.addressName}</Dd>
            </Item>
            <Item>
              <Dt>연락처</Dt>
              <Dd>{adress.addressPhone}</Dd>
            </Item>
            <Item>
              <Dt>배송 주소</Dt>
              <Dd>{adress.addressDetail}</Dd>
            </Item>
          </Dl>
          <Button onClick={ChangeAdd}>변경</Button>
        </Wrapper>
      )}
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
