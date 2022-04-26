import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Menu from '../../molecules/my/Menu';
import MenuItem from '../../atoms/my/MenuItem';

function SideNavBarContainer() {
  const [index, setIndex] = useState(0);
  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };
  return (
    <Container>
      <Link to="/my" onClick={onClickHandler}>
        <SideBarMainTitle>마이 페이지</SideBarMainTitle>
      </Link>
      <SideNavBar>
        <Menu title="쇼핑 정보">
          <MenuItem onClick={onClickHandler}>
            <Link to="/my/buying">구매 내역</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/my/selling">판매 내역</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/my/wish">관심 내역</Link>
          </MenuItem>
        </Menu>
        <Menu title="내 정보">
          <MenuItem>
            <Link to="/my/profile">프로필 정보</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/my/address">주소록</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/my/payment">결제 정보</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/my/account">판매 정산 계좌</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/my/point">포인트</Link>
          </MenuItem>
        </Menu>
      </SideNavBar>
    </Container>
  );
}

const Container = styled.div`
  float: left;
  width: 180px;
  margin-right: 20px;
  a {
    text-decoration: none;
    color: inherit;
  }
  div strong {
    line-height: 22px;
    margin-bottom: 12px;
    display: inline-block;
    vertical-align: top;
    font-size: 18px;
    letter-spacing: -0.27px;
    font-weight: 700;
  }
`;

const SideBarMainTitle = styled.h2`
  line-height: 29px;
  padding-bottom: 30px;
  font-size: 24px;
  letter-spacing: -0.36px;
  font-weight: 700;
  letter-spacing: -0.15px;
  text-decoration: none;
`;
const SideNavBar = styled.nav`
  div + div {
    margin-top: 40px;
  }
  li + li {
    margin-top: 12px;
  }
  li a {
    line-height: 18px;
    font-size: 15px;
    letter-spacing: -0.15px;
    color: rgba(34, 34, 34, 0.5);
    text-decoration: none;
  }
`;

export default SideNavBarContainer;
