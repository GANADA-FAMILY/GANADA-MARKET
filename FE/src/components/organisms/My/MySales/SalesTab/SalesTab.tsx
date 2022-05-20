import styled from '@emotion/styled';
import { TabPane } from 'components/atoms/My';
import { Tabs } from 'components/molecules/My';
import getSizeByStatus from 'functions/getSizeByStatus';
import { Link } from 'react-router-dom';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import {
  getFilteredSalesHistory,
  setTabIndex,
} from 'state/reducers/SalesHistorySlice';

function SalesTab() {
  const dispatch = useRootDispatch();
  const tabIndex = useRootSelector((state) => state.salesHistory.tabIndex);
  const salesHistory = useRootSelector(
    (state) => state.salesHistory.salesHistory,
  );
  return (
    <StyledTab>
      <TabPane
        bordered={tabIndex === -1}
        onClick={async () => {
          await dispatch(setTabIndex(-1));
          dispatch(getFilteredSalesHistory());
        }}
      >
        <TabLink to="/my/sales">
          <TabBox>
            <TabCount>
              {salesHistory.length === undefined ? 0 : salesHistory.length}
            </TabCount>
            <TabTitle>전체</TabTitle>
          </TabBox>
        </TabLink>
      </TabPane>
      <TabPane
        bordered={tabIndex === 0}
        onClick={async () => {
          await dispatch(setTabIndex(0));
          dispatch(getFilteredSalesHistory());
        }}
      >
        <TabLink to="/my/sales">
          <TabBox>
            <TabCount>{getSizeByStatus(salesHistory, 0)}</TabCount>
            <TabTitle>입금 대기</TabTitle>
          </TabBox>
        </TabLink>
      </TabPane>
      <TabPane
        bordered={tabIndex === 1}
        onClick={async () => {
          await dispatch(setTabIndex(1));
          dispatch(getFilteredSalesHistory());
        }}
      >
        <TabLink to="/my/sales">
          <TabBox>
            <TabCount>{getSizeByStatus(salesHistory, 1)}</TabCount>
            <TabTitle>입금 완료</TabTitle>
          </TabBox>
        </TabLink>
      </TabPane>
      <TabPane
        bordered={tabIndex === 2}
        onClick={async () => {
          await dispatch(setTabIndex(2));
          dispatch(getFilteredSalesHistory());
        }}
      >
        <TabLink to="/my/sales">
          <TabBox>
            <TabCount>{getSizeByStatus(salesHistory, 2)}</TabCount>
            <TabTitle>배송 중</TabTitle>
          </TabBox>
        </TabLink>
      </TabPane>
      <TabPane
        bordered={tabIndex === 3}
        onClick={async () => {
          await dispatch(setTabIndex(3));
          dispatch(getFilteredSalesHistory());
        }}
      >
        <TabLink to="/my/sales">
          <TabBox>
            <TabCount>{getSizeByStatus(salesHistory, 3)}</TabCount>
            <TabTitle>종료</TabTitle>
          </TabBox>
        </TabLink>
      </TabPane>
    </StyledTab>
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
export default SalesTab;
