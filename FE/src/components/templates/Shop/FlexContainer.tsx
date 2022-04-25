import React from 'react';
import styled from '@emotion/styled';

interface SpanProp {
  children: React.ReactNode;
}

function SpanContainer({ children }: SpanProp): JSX.Element {
  return <FlexDiv>{children}</FlexDiv>;
}

const FlexDiv = styled.div<SpanProp>`
  display: flex;
`;

export default SpanContainer;
