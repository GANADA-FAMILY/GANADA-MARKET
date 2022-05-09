import React from 'react';
import styled from '@emotion/styled';

interface GridProps {
  children: React.ReactNode;
  columns?: string;
}

function GridBox({ children, columns }: GridProps) {
  return <Grid columns={columns}>{children}</Grid>;
}

export default GridBox;

GridBox.defaultProps = {
  columns: '1fr 1fr 1fr 1fr',
};
const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
`;
