import styled from '@emotion/styled';
import React from 'react';

interface InfoGroupProps {
  children: React.ReactNode;
  title: string;
}
function InfoGroup({ children, title }: InfoGroupProps) {
  return (
    <Molecules>
      <GroupTitle>{title}</GroupTitle>
      {children}
    </Molecules>
  );
}
const GroupTitle = styled.h4`
  font-size: 18px;
  letter-spacing: -0.27px;
`;
const Molecules = styled.div``;

export default InfoGroup;
