import React from 'react';
import styled from '@emotion/styled';

interface TabPaneProps {
  children: React.ReactNode;
}

function TabPane({ children, ...rest }: TabPaneProps) {
  return <Molecule {...rest}>{children}</Molecule>;
}
const Molecule = styled.div`
  display: table-cell;
  text-align: center;
`;

export default TabPane;
