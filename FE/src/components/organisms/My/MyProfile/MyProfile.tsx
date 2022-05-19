import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import TitleBar from 'components/molecules/My/TitleBar';
import { User } from 'types/Entity/UserAPI';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';

const user: User = {
  userEmail: 'zxc123@naver.com',
  userNickname: 'zxc123',
  userPhone: '010-3333-4444',
  profileImageUrl: 'https://kream.co.kr/_nuxt/img/blank_profile.4347742.png',
  grade: '일반 회원',
  orderHistory: [],
  salesHistory: [],
};

function MyProfile() {
  return (
    <Container>
      <MainTitleBar title="프로필 정보" size={24} bordered />
      {/* <ProfileHeader user={item} /> */}
      <ProfileHeader />
      <ProfileContent />
    </Container>
  );
}

const Container = styled.section``;

const MainTitleBar = styled(TitleBar)`
  padding-bottom: 16px;
`;

export default MyProfile;
