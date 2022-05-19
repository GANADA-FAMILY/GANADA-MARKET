import styled from '@emotion/styled';
import userAPI from 'api/userAPI';
import MyAccount from 'components/organisms/My/MyAccount/MyAccount';
import { useAuth, useFetch } from 'hooks';
import { useEffect } from 'react';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import { getBank } from 'state/reducers/BankSlice';
import { Bank } from 'types/Entity/UserAPI';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';

function MyAccountPage() {
  // const { user, loading, dispatch } = useAuth();
  // const [bank, error, isLoading] = useFetch<unknown, Bank>({
  //   api: userAPI.getBank,
  // });
  const dispatch = useRootDispatch();
  const bank = useRootSelector((state) => state.bank.bank);
  useEffect(() => {
    dispatch(getBank());
  }, []);
  return (
    <MainContainer>
      {bank !== undefined && <MyPageTemplate element={<MyAccount />} />}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MyAccountPage;
