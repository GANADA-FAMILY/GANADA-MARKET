import React from 'react';
import styled from '@emotion/styled';

interface PropsStyle {
  children: React.ReactNode;
}

function FlexContainer({ children }: PropsStyle) {
  return <Flex>{children}</Flex>;
}

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

export default FlexContainer;
