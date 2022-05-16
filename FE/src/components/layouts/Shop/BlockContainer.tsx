import React from 'react';
import styled from '@emotion/styled';

interface PropsStyle {
  children: React.ReactNode;
}

function BlockContainer({ children, ...rest }: PropsStyle) {
  return <Block style={{ ...rest }}>{children}</Block>;
}

const Block = styled.div`
  display: block;
`;

export default BlockContainer;
