import React from 'react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Container({ children, className }: Props) {
  return <Box className={className}>{children}</Box>;
}

Container.defaultProps = {
  className: '',
};

export default Container;

const Box = styled.div`
  width: 100%;
  padding: 3.2rem;
  margin-bottom: 0.8rem;
  background-color: #fff;
  font-size: 1.4rem;
`;
