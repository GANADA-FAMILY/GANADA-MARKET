import styled from '@emotion/styled';
import React from 'react';
import Address from '../../../../../type/Address';
import LinkButton from '../../../../atoms/my/LinkButton';

interface ButtonBoxProps {
  active?: boolean;
  item: Address;
}
function ButtonsBox({ active, item }: ButtonBoxProps) {
  return (
    <Molecule>
      {active ? <LinkButton href="/">기본 배송지</LinkButton> : ''}
      <LinkButton href="/">수정</LinkButton>
      <LinkButton href="/">삭제</LinkButton>
    </Molecule>
  );
}
ButtonsBox.defaultProps = {
  active: false,
};
const Molecule = styled.div`
  margin-top: 14px;
  margin-left: auto;
  a + a {
    margin-left: 8px;
  }
`;
export default ButtonsBox;
