import React from 'react';
import styled from '@emotion/styled';

interface PropsStyle {
  children: React.ReactNode;
}

function BlockContainer({ children }: PropsStyle) {
  return <Block>{children}</Block>;
}

const Block = styled.div`
  display: 'block';
  position: 'relative';
  width: '300px';
  height: '300px';
  backgroundcolor: '#fff';
`;

export default BlockContainer;
