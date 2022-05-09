import React from 'react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

function Container({ children }: Props) {
  return <Box>{children}</Box>;
}

export default Container;

const Box = styled.div`
  width: 100%;
  padding: 3.2rem;
  margin-bottom: 0.8rem;
  background-color: #fff;
  font-size: 1.4rem;
`;
