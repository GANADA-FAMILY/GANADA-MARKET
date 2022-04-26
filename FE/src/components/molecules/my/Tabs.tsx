import styled from '@emotion/styled';
import React from 'react';

interface TabsProps {
  children: React.ReactNode;
}

function Tabs({ children, ...rest }: TabsProps) {
  return <Molecule {...rest}>{children}</Molecule>;
}
const Molecule = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  background-color: #fafafa;
  border-radius: 12px;
  div:first-of-type a:before {
    content: '';
    position: absolute;
    top: 18px;
    right: 0;
    width: 1px;
    bottom: 18px;
    background-color: #ebebeb;
  }
`;
export default Tabs;
