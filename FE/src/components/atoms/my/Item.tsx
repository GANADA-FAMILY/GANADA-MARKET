import React from 'react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
  item: any;
  // activate: boolean,
}
function Item({ children, item, ...props }: Props) {
  return <StyledItem {...props}>{children}</StyledItem>;
}
const StyledItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
export default Item;
