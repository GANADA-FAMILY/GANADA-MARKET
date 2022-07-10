import styled from 'styled-components';
import { useState } from 'react';
import { MenuList, Navigation, Logo } from '../../molecules/changgun';
import { MenuLink, NavLink } from '../../atoms/changgun';
import { ReactComponent as SearchIcon } from '../../../assets/svgs/search.svg';
import { TopModal } from '../../layouts/changgun';
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
  const [token, setToken] = useState<null | string>(
    localStorage.getItem('token'),
  );

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <HeaderWrapper>
      <HeaderTop>
        <MenuList>
          <MenuLink to="/my/wish">관심상품</MenuLink>
          <MenuLink to="/my">마이페이지</MenuLink>
          {token ? (
            <MenuLink
              onClick={() => {
                logoutHandler();
              }}
              to="/"
            >
              로그아웃
            </MenuLink>
          ) : (
            <MenuLink to="/login">로그인</MenuLink>
          )}
        </MenuList>
      </HeaderTop>
      <HeaderBottom>
        <Logo width="8rem" height="4rem" />
        <Navigation>
          <NavLink to="/shop/phone">SHOP</NavLink>
          <SearchIcon fill="#333" width="3rem" height="3rem" />
        </Navigation>
      </HeaderBottom>
    </HeaderWrapper>
  );
}

export { Header };
