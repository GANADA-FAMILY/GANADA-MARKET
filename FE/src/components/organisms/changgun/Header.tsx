import styled from 'styled-components';
import { MenuList, Navigation, Logo } from '../../molecules/changgun';
import { MenuLink, NavLink } from '../../atoms/changgun';
import { ReactComponent as SearchIcon } from '../../../assets/svgs/search.svg';
import { Modal } from '../../layouts/changgun';
import { Search } from './Search';

const HeaderTop = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 4rem;
  border-bottom: 1px solid #ebebeb;
`;

const HeaderBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  position: fixed;
  top: 0;
  width: 100%;
  height: 10rem;
  z-index: 10;
`;

function Header() {
  return (
    <HeaderWrapper>
      <HeaderTop>
        <MenuList>
          <MenuLink to="/">고객센터</MenuLink>
          <MenuLink to="/">관심상품</MenuLink>
          <MenuLink to="/my">마이페이지</MenuLink>
        </MenuList>
      </HeaderTop>
      <HeaderBottom>
        <Logo width="8rem" height="4rem" />
        <Navigation>
          <NavLink to="/shop">SHOP</NavLink>
          <NavLink to="/about">ABOUT</NavLink>
          <Modal
            trigger={<SearchIcon width="3rem" height="3rem" />}
            inset="0 0 70% 0"
          >
            <Search />
          </Modal>
        </Navigation>
      </HeaderBottom>
    </HeaderWrapper>
  );
}

export { Header };
