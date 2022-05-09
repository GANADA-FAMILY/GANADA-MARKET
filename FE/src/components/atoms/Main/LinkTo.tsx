import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface LinkProps {
  children: React.ReactNode;
  to: string;
}
function LinkTo({ children, to }: LinkProps) {
  return <LinkAtom to={to}>{children}</LinkAtom>;
}

export default LinkTo;

const LinkAtom = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
