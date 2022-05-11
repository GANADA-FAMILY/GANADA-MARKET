import React from 'react';
import styled from '@emotion/styled';
// import MyProfileContainer from '../components/organisms/my/MyProfileContainer';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';
import MyProfile from '../components/organisms/My/MyProfile';

function MyProfilePage() {
  return (
    <MainContainer>
      {/* <MyPageTemplate element={<MyProfileContainer />} /> */}
      <MyPageTemplate element={<MyProfile />} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MyProfilePage;
