/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { List, Tabs } from 'components/molecules/My';
import { TabPane } from 'components/atoms/My';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import { useEffect } from 'react';
import {
  getFilteredOrderHistory,
  getOrderHistory,
  setTabIndex,
} from 'state/reducers/OrderHistorySlice';
import getSizeByStatus from 'functions/getSizeByStatus';
import theme from 'styles/theme';

function PurchaseBox() {
  const dispatch = useRootDispatch();
  const orderHistory = useRootSelector(
    (state) => state.orderHistory.orderHistory,
  );
  useEffect(() => {
    dispatch(getOrderHistory());
  }, []);
  return (
    <StyledBox>
      <StyledTab>
        <TabPane
          onClick={async () => {
            await dispatch(setTabIndex(-1));
            dispatch(getFilteredOrderHistory());
          }}
        >
          <TabLink to="/my/buying">
            <TabBox>
              <TabTitle>전체</TabTitle>
              <TabCount
                css={css`
                  color: ${theme.color.green};
                `}
              >
                {orderHistory.length === undefined ? 0 : orderHistory.length}
              </TabCount>
            </TabBox>
          </TabLink>
        </TabPane>
        <TabPane
          onClick={async () => {
            await dispatch(setTabIndex(0));
            dispatch(getFilteredOrderHistory());
          }}
        >
          <TabLink to="/my/buying">
            <TabBox>
              <TabTitle>입금 대기</TabTitle>
              <TabCount>{getSizeByStatus(orderHistory, 0)}</TabCount>
            </TabBox>
          </TabLink>
        </TabPane>
        <TabPane
          onClick={async () => {
            await dispatch(setTabIndex(1));
            dispatch(getFilteredOrderHistory());
          }}
        >
          <TabLink to="/my/buying">
            <TabBox>
              <TabTitle>입금 완료</TabTitle>
              <TabCount>{getSizeByStatus(orderHistory, 1)}</TabCount>
            </TabBox>
          </TabLink>
        </TabPane>
        <TabPane
          onClick={async () => {
            await dispatch(setTabIndex(2));
            dispatch(getFilteredOrderHistory());
          }}
        >
          <TabLink to="/my/buying">
            <TabBox>
              <TabTitle>배송 중</TabTitle>
              <TabCount>{getSizeByStatus(orderHistory, 2)}</TabCount>
            </TabBox>
          </TabLink>
        </TabPane>
        <TabPane
          onClick={async () => {
            await dispatch(setTabIndex(3));
            dispatch(getFilteredOrderHistory());
          }}
        >
          <TabLink to="/my/buying">
            <TabBox>
              <TabTitle>종료</TabTitle>
              <TabCount>{getSizeByStatus(orderHistory, 3)}</TabCount>
            </TabBox>
          </TabLink>
        </TabPane>
      </StyledTab>
      <ListArea>
        <List dataSoruce={orderHistory} />
      </ListArea>
    </StyledBox>
  );
}
const StyledTab = styled(Tabs)`
  margin-bottom: 1.5rem;
`;
const TabLink = styled(Link)`
  position: relative;
  display: block;
  padding-top: 18px;
  height: 96px;
  text-decoration: none;
  color: inherit;
`;
const TabBox = styled.dl`
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;
const TabTitle = styled.dt`
  font-size: 13px;
  letter-spacing: -0.07px;
  color: rgba(34, 34, 34, 0.8);
`;
const TabCount = styled.dd`
  margin-top: 2px;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.09px;
  font-weight: 700;
`;
const ListArea = styled.div``;
const StyledBox = styled.div``;

export default PurchaseBox;
