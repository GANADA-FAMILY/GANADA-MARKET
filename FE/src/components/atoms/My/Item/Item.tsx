import React from 'react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
  item: any;
  className?: string;
}
function Item({ children, ...props }: Props) {
  return <StyledItem className={props.className}>{children}</StyledItem>;
}
const StyledItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
`;
export default Item;
