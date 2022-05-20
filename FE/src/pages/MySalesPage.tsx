import styled from '@emotion/styled';
import { MySales } from 'components/organisms/My';
import { useEffect } from 'react';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import { getSalesHistory } from 'state/reducers/SalesHistorySlice';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';

function MySalesPage() {
  const dispatch = useRootDispatch();
  const salesHistory = useRootSelector(
    (state) => state.salesHistory.salesHistory,
  );
  useEffect(() => {
    dispatch(getSalesHistory());
  }, []);
  return (
    <MainContainer>
      <MyPageTemplate element={<MySales items={salesHistory} />} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MySalesPage;
