import styled from 'styled-components';
import { MenuLink } from '../../atoms/changgun';

const MenuListLayout = styled.div`
  display: flex;
  column-gap: 3rem;
  font-weight: 300;
`;

interface MenuListProps {
  children: React.ReactNode;
}

function MenuList({ children }: MenuListProps) {
  return <MenuListLayout>{children}</MenuListLayout>;
}

export { MenuList };
