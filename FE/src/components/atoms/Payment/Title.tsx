import React from 'react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

function Title({ children }: Props) {
  return <Atom>{children}</Atom>;
}

export default Title;

const Atom = styled.h1`
  font-size: 2rem;
`;
