import React from 'react';
import styled from '@emotion/styled';
// import MyHomeContainer from '../components/organisms/my/MyHomeContainer';
import MyHome from '../components/organisms/my/MyHome';
import MyPageTemplate from '../components/templates/MyPageTemplate';

function MyPage() {
  return (
    <MainContainer>
      {/* <MyPageTemplate element={<MyHomeContainer />} /> */}
      <MyPageTemplate element={<MyHome />} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MyPage;
