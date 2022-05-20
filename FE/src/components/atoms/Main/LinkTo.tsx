import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface LinkProps {
  children: React.ReactNode;
  to: string;
  className?: string;
}
function LinkTo({ children, to, className }: LinkProps) {
  return (
    <LinkAtom to={to} className={className}>
      {children}
    </LinkAtom>
  );
}

LinkTo.defaultProps = {
  className: '',
};

export default LinkTo;

const LinkAtom = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 1.4rem;
  &:hover {
    text-decoration: underline;
  }
`;
