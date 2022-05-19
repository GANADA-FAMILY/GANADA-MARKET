import styled from '@emotion/styled';
import MyPurchase from 'components/organisms/My/MyPurchase/MyPurchase';
import MyPageTemplate from 'components/templates/MyPageTemplate/MyPageTemplate';
import { useEffect } from 'react';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import { getOrderHistory } from 'state/reducers/OrderHistorySlice';

function MyPurchasePage() {
  const dispatch = useRootDispatch();
  const orderHistory = useRootSelector(
    (state) => state.orderHistory.orderHistory,
  );
  useEffect(() => {
    dispatch(getOrderHistory());
  }, []);
  return (
    <MainContainer>
      {orderHistory !== undefined && (
        <MyPageTemplate element={<MyPurchase orderHistory={orderHistory} />} />
      )}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MyPurchasePage;
