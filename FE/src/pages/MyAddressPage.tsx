import styled from '@emotion/styled';
import { useFetch } from 'hooks';
import userAPI from 'api/userAPI';
import { Address } from 'types/Entity/UserAPI';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';
import MyAddress from '../components/organisms/My/MyAddress';

interface addressBookListProps {
  addressBookList: Array<Address>;
}

function MyAddressPage() {
  const [items, error, isLoading] = useFetch<null, addressBookListProps>({
    api: userAPI.getAddressbook,
  });

  return (
    <MainContainer>
      {items !== undefined && (
        <MyPageTemplate element={<MyAddress items={items.addressBookList} />} />
      )}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MyAddressPage;
