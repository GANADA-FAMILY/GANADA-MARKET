import React from 'react';
import styled from '@emotion/styled';

interface LinkProps {
  onClick: React.MouseEventHandler<HTMLElement>;
  children: React.ReactNode;
  isClick: boolean;
}

function LinkTag({ onClick, children, isClick }: LinkProps): JSX.Element {
  return (
    <NavFilterLink isClick={isClick} onClick={onClick}>
      {children}
    </NavFilterLink>
  );
}
const NavFilterLink = styled.a<LinkProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: red;
  }
  color: ${(props) => (props.isClick ? 'red' : 'black')};
`;

export default LinkTag;
