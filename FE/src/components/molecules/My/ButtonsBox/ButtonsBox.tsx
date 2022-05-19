import styled from '@emotion/styled';
import React from 'react';
import { Button, LinkButton } from 'components/atoms/My';
import theme from 'styles/theme';
import Address from 'types/Entity/UserAPI/Address';

interface ButtonBoxProps {
  item: Address;
  onActivate?: React.MouseEventHandler<HTMLAnchorElement>;
  onModify?: React.MouseEventHandler<HTMLAnchorElement>;
  onDelete?: React.MouseEventHandler<HTMLAnchorElement>;
  // onClick: React.MouseEventHandler<HTMLElement>;
  id: string;
}
function ButtonsBox({
  onActivate = () => null,
  onModify = () => null,
  onDelete = () => null,
  id,
  ...props
}: ButtonBoxProps) {
  return (
    <Molecule>
      {props.item.activate ? (
        ''
      ) : (
        <Button
          size="small"
          type="button"
          onClick={onActivate}
          name={`${id}-active`}
        >
          기본 배송지
        </Button>
      )}
      <Button
        size="small"
        type="button"
        onClick={onModify}
        name={`${id}-modify`}
      >
        수정
      </Button>
      <Button
        size="small"
        type="button"
        onClick={onDelete}
        name={`${id}-delete`}
      >
        삭제
      </Button>
    </Molecule>
  );
}
const Molecule = styled.div`
  margin-top: 14px;
  margin-left: auto;
  button {
    font-weight: 300;
    background-color: ${theme.color.white};
    color: ${theme.color.black2};
    border: 1px solid #d3d3d3;
  }
  button + button {
    margin-left: 8px;
  }
`;
export default ButtonsBox;
