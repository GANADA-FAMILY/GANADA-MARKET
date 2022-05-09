import React from 'react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

function SubTitle({ children }: Props) {
  return <Atom>{children}</Atom>;
}

export default SubTitle;

const Atom = styled.p`
  font-size: 1.4rem;
`;
