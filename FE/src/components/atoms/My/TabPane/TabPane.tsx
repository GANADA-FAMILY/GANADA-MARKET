import React from 'react';
import styled from '@emotion/styled';

interface TabPaneProps {
  children: React.ReactNode;
  bordered?: boolean;
  onClick?: () => void;
}

function TabPane({
  children,
  bordered = false,
  onClick,
  ...rest
}: TabPaneProps) {
  return (
    <Molecule bordered={bordered} onClick={onClick} {...rest}>
      {children}
    </Molecule>
  );
}
const Molecule = styled.div<TabPaneProps>`
  display: table-cell;
  text-align: center;
  border-bottom: ${(props) => (props.bordered ? `2px solid #222` : '')};
`;
export default TabPane;
