import styled from '@emotion/styled';
import MyPurchaseContainer from '../components/organisms/my/MyPurchaseContainer';
import MyPageTemplate from '../components/templates/MyPageTemplate';

const MyPurchasePage = () => {
  return (
      <MainContainer>
        <MyPageTemplate element={<MyPurchaseContainer/>}/>
      </MainContainer>
  );
};

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;



export default MyPurchasePage;
