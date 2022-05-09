import React from 'react';
import styled from '@emotion/styled';

interface MenuProps {
  children: React.ReactNode;
  className?: string;
  mode?: string;
  style?: React.CSSProperties;
  title?: string;
}

function Menu({ children, className, mode, style, title, ...rest }: MenuProps) {
  return (
    <Molecule
      className={className}
      style={{
        ...style,
      }}
      {...rest}
    >
      <MenuTitle>{title}</MenuTitle>
      <MenuList>{children}</MenuList>
    </Molecule>
  );
}
const Molecule = styled.div``;
const MenuTitle = styled.strong``;
const MenuList = styled.ul`
  list-style: none;
`;

Menu.defaultProps = {
  className: '',
  mode: '',
  style: '',
  title: '',
};
export default Menu;
