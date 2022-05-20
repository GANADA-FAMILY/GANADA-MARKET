import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import { getAddressbook } from 'state/reducers/AddressbookSlice';
import MyAddress from '../components/organisms/My/MyAddress';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';

function MyAddressPage() {
  const dispatch = useRootDispatch();
  const items = useRootSelector((state) => state.addressbook.addressbook);
  useEffect(() => {
    dispatch(getAddressbook());
  }, []);
  return (
    <MainContainer>
      {items !== undefined && <MyPageTemplate element={<MyAddress />} />}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MyAddressPage;
