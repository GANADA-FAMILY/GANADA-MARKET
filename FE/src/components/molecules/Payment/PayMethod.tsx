import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import SubTitle from '../../atoms/Main/SubTitle';
import Logo from '../../atoms/Main/Logo/Logo';

interface Props {
  checked: boolean;
  item: ItemProps;
  onClick: React.MouseEventHandler<HTMLElement>;
}
interface ItemProps {
  bank: string;
  src: string;
  alt: string;
}

function PayMethod({ item, checked, onClick }: Props) {
  return (
    <Container checked={checked} onClick={onClick}>
      {item !== undefined && (
        <>
          <SubTitle>{item.bank}</SubTitle>
          <Logo src={item.src} alt={item.alt} />
        </>
      )}
    </Container>
  );
}

const Container = styled.div<Partial<Props>>`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid #ebebeb;
  min-height: 6rem;
  width: calc(50% - 3px);
  margin: 6px 0 0;
  cursor: pointer;
  ${(props) =>
    props.checked &&
    css`
      border: 1px solid #000;
      font-weight: 700;
    `}
`;
export default PayMethod;
