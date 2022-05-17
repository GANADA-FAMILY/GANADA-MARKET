import React from 'react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Title({ children, className }: Props) {
  return <Atom className={className}>{children}</Atom>;
}

Title.defaultProps = {
  className: '',
};

const Atom = styled.h1`
  font-size: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Title;
