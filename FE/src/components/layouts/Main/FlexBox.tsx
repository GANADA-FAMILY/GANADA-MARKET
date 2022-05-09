import React from 'react';
import styled from '@emotion/styled';

interface FlexProps {
  children: React.ReactNode;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  margin?: string;
}

function FlexBox({ children, ...rest }: FlexProps) {
  return <Flex {...rest}>{children}</Flex>;
}

export default FlexBox;

FlexBox.defaultProps = {
  flexDirection: 'column',
  justifyContent: null,
  alignItems: null,
  margin: null,
};
const Flex = styled.div<FlexProps>`
  display: Flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  margin: ${(props) => props.margin};
`;
