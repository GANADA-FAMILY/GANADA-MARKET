import styled from '@emotion/styled';
import React from 'react';

interface ModifyBoxProps {
  children: React.ReactNode;
  toggle: boolean;
}
function ModifyBox({ children, toggle, ...props }: ModifyBoxProps) {
  return (
    <Atom toggle={toggle} {...props}>
      {children}
    </Atom>
  );
}

const Atom = styled.div<ModifyBoxProps>`
  display: ${(props) => (props.toggle ? '' : 'none')};
  padding-top: 23px;
  .title {
    padding-bottom: 22px;
    color: #222;
    font-size: 13px;
    letter-spacing: -0.07px;
  }
`;
export default ModifyBox;
