import React from 'react';
import styled from '@emotion/styled';

interface SpanProp {
  children: React.ReactNode;
}

const SpanContainer = React.memo(({ children }: SpanProp) => {
  return <FlexDiv>{children}</FlexDiv>;
});

const FlexDiv = styled.div<SpanProp>`
  display: flex;
`;

export default SpanContainer;
