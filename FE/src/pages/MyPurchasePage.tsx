import React from 'react';
import styled from '@emotion/styled';
import MyPurchaseContainer from '../components/organisms/My/MyPurchase/MyPurchase';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';

function MyPurchasePage() {
  return (
    <MainContainer>
      <MyPageTemplate element={<MyPurchaseContainer />} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MyPurchasePage;
