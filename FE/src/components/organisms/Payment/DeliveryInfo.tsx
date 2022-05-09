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
        {/* 테이블들어감 */}
        <table>
          <tr>
            <th>헤더1</th>
            <td>데이터</td>
            <td>데이터</td>
            <td>데이터</td>
          </tr>
          <tr>
            <td>바디</td>
          </tr>
        </table>
        <Button onClick={ChangeAdd}>변경</Button>
      </Wrapper>
    </Container>
  );
}

export default DeliveryInfo;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
