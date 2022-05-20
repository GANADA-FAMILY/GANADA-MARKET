import styled from '@emotion/styled';
import MySelling from 'components/organisms/My/MySelling';
import { useEffect } from 'react';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import { getSellingList } from 'state/reducers/SellingSlice';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';

function MySellingPage() {
  const dispatch = useRootDispatch();
  const sellingList = useRootSelector((state) => state.sellingList.sellingList);

  useEffect(() => {
    dispatch(getSellingList());
  }, []);

  return (
    <MainContainer>
      {sellingList[0] !== undefined && (
        <MyPageTemplate element={<MySelling items={sellingList} />} />
      )}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MySellingPage;
