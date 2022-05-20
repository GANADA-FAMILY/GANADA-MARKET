import styled from '@emotion/styled';
import { useAuth } from 'hooks';
import MyHome from '../components/organisms/My/MyHome';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';

function MyPage() {
  const { user } = useAuth();
  return (
    <MainContainer>
      {user !== undefined && (
        <MyPageTemplate element={<MyHome user={user} />} />
      )}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MyPage;
