import styled from '@emotion/styled';
import React from 'react';
import MyPageTemplate from '../components/templates/MyPageTemplate';
// import MyAddressContainer from '../components/organisms/my/MyAddressContainer';
import MyAddress from '../components/organisms/my/MyAddress';

function MyAddressPage() {
  return (
    <MainContainer>
      <MyPageTemplate element={<MyAddress />} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MyAddressPage;
