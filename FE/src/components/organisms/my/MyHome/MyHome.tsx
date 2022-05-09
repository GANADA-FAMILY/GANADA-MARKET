import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import MembershipBox from './MembershipBox';
import User from '../../../../type/User';
import PurchaseBox from './PurchaseBox';
import SellBox from './SellBox/SellBox';
import TitleBar from '../../../molecules/my/TitleBar';
import List from '../../../molecules/my/List';

const user: User = {
  userEmail: 'zxc123@naver.com',
  userNickname: 'zxc123',
  userPhone: '01033334444',
  profileImageUrl: 'https://kream.co.kr/_nuxt/img/blank_profile.4347742.png',
  grade: '일반 회원',
};

function MyHome() {
  return (
    <Container>
      <MembershipBox user={user} />
      <MyHomeTitle title="구매 내역" size={18} src="/my/buying" />
      <PurchaseBox />
      <MyHomeTitle title="판매 내역" size={18} src="/my/selling" />
      <SellBox />
      <MyHomeTitle title="관심 상품" size={18} src="/my/wish" />
      <ListArea>
        <List items={[]} />
      </ListArea>
    </Container>
  );
}

const MyHomeTitle = styled(TitleBar)`
  margin-top: 42px;
  padding-bottom: 16px;
  display: flex;
  max-width: 100%;
`;
const Container = styled.section``;
const ListArea = styled.div``;
export default MyHome;
