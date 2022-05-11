import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface LinkProps {
  onClick: React.MouseEventHandler<HTMLElement>;
  children: React.ReactNode;
  isClick?: boolean;
  virtualAfter?: boolean;
  hoverColor?: boolean;
}

LinkTag.defaultProps = {
  isClick: false,
  virtualAfter: false,
  hoverColor: false,
};

function LinkTag({
  onClick,
  children,
  isClick,
  virtualAfter,
  hoverColor,
  ...rest
}: LinkProps): JSX.Element {
  return (
    <NavFilterLink
      isClick={isClick}
      onClick={onClick}
      virtualAfter={virtualAfter}
      hoverColor={hoverColor}
      style={{ ...rest }}
    >
      {children}
    </NavFilterLink>
  );
}
const NavFilterLink = styled.a<LinkProps>`
  cursor: pointer;

  ${(props) =>
    props.hoverColor &&
    css`
      &:hover {
        color: #fd4d57;
      }
    `}

  color: ${(props) => (props.isClick ? 'red' : '#787a87;')};

  font-size: 1.6rem;

  ${(props) =>
    props.virtualAfter &&
    css`
      &::after {
        content: '|';
        display: inline-block;
        cursor: none;
        height: 1.6rem;
        width: 1rem;
        color: #dfe0e5;
        margin-right: 1.6rem;
        margin-left: 1.6rem;
      }
    `}
`;

export default LinkTag;
