import styled from '@emotion/styled';
import MyWish from 'components/organisms/My/MyWish';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';

function MyWishPage() {
  return (
    <MainContainer>
      <MyPageTemplate element={<MyWish />} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MyWishPage;
