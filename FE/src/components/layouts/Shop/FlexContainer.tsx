import React from 'react';
import styled from '@emotion/styled';

interface PropsStyle {
  children: React.ReactNode;
}

function FlexContainer({ children, ...rest }: PropsStyle) {
  return <Flex style={{ ...rest }}>{children}</Flex>;
}

const Flex = styled.div`
  display: flex;
`;

export default FlexContainer;
