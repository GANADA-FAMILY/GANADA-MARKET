import styled from '@emotion/styled';
import userAPI from 'api/userAPI';
import MyAccount from 'components/organisms/My/MyAccount/MyAccount';
import { useAuth, useFetch } from 'hooks';
import { Bank } from 'types/Entity/UserAPI';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';

// const bank: Bank = {
//   bank: '신한',
//   bankNum: '110333444444',
//   bankHolder: '홍길동',
// };

function MyAccountPage() {
  const { user, loading, dispatch } = useAuth();
  const [bank, error, isLoading] = useFetch({ api: userAPI.getBank });

  return (
    <MainContainer>
      {!loading && <MyPageTemplate element={<MyAccount bank={bank} />} />}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MyAccountPage;
