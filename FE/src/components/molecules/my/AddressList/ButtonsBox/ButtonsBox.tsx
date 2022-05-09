import styled from '@emotion/styled';
import React from 'react';
import LinkButton from 'components/atoms/my/LinkButton';
import Address from 'type/Address';

interface ButtonBoxProps {
  item: Address;
}
function ButtonsBox({ ...props }: ButtonBoxProps) {
  return (
    <Molecule>
      {props.item.activate ? '' : <LinkButton href="/">기본 배송지</LinkButton>}
      <LinkButton href="/">수정</LinkButton>
      <LinkButton href="/">삭제</LinkButton>
    </Molecule>
  );
}
const Molecule = styled.div`
  margin-top: 14px;
  margin-left: auto;
  a + a {
    margin-left: 8px;
  }
`;
export default ButtonsBox;
