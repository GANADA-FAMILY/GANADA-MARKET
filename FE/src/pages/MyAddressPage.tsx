import styled from '@emotion/styled';
import { Address } from 'types/Entity/UserAPI';
import useAsync from 'hooks/useAsync';
import { getAddressbook } from 'state/reducers/AddressSlice';
import { useRootSelector } from 'state/Hooks';
import MyAddress from '../components/organisms/My/MyAddress';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';

function MyAddressPage() {
  const { data } = useAsync<Address[], void>({
    thunk: getAddressbook(),
    selector: useRootSelector((state) => state.addressbook.addressbook),
  });

  return (
    <MainContainer>
      {data !== undefined && <MyPageTemplate element={<MyAddress />} />}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MyAddressPage;
