import styled from '@emotion/styled';
import React from 'react';
import { LinkButton } from 'components/atoms/My';
import Address from 'types/Entity/UserAPI/Address';

interface ButtonBoxProps {
  item: Address;
  onActivate?: React.MouseEventHandler<HTMLAnchorElement>;
  onModify?: React.MouseEventHandler<HTMLAnchorElement>;
  onDelete?: React.MouseEventHandler<HTMLAnchorElement>;
  // key: string;
}
function ButtonsBox({
  onActivate = () => null,
  onModify = () => null,
  onDelete = () => null,
  ...props
}: ButtonBoxProps) {
  return (
    <Molecule>
      {props.item.activate ? (
        ''
      ) : (
        <LinkButton href="#" onClick={onActivate}>
          기본 배송지
        </LinkButton>
      )}
      <LinkButton href="#" onClick={onModify}>
        수정
      </LinkButton>
      <LinkButton href="#" onClick={onDelete}>
        삭제
      </LinkButton>
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
