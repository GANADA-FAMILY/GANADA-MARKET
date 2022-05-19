import styled from '@emotion/styled';
import { TabPane } from 'components/atoms/My';
import { Tabs } from 'components/molecules/My';
import { Link } from 'react-router-dom';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import { setTabIndex } from 'state/reducers/OrderHistorySlice';

function PurchaseTab() {
  const dispatch = useRootDispatch();
  const tabIndex = useRootSelector((state) => state.orderHistory.tabIndex);
  const orderHistory = useRootSelector(
    (state) => state.orderHistory.orderHistory,
  );
  return (
    <Tabs>
      <TabPane
        bordered={tabIndex === -1}
        onClick={() => dispatch(setTabIndex(-1))}
      >
        <TabLink to="/my/buying">
          <TabBox>
            <TabCount>
              {orderHistory.length === undefined ? 0 : orderHistory.length}
            </TabCount>
            <TabTitle>전체</TabTitle>
          </TabBox>
        </TabLink>
      </TabPane>
      <TabPane
        bordered={tabIndex === 0}
        onClick={() => dispatch(setTabIndex(0))}
      >
        <TabLink to="/my/buying">
          <TabBox>
            <TabCount>0</TabCount>
            <TabTitle>입금 대기</TabTitle>
          </TabBox>
        </TabLink>
      </TabPane>
      <TabPane
        bordered={tabIndex === 1}
        onClick={() => dispatch(setTabIndex(1))}
      >
        <TabLink to="/my/buying">
          <TabBox>
            <TabCount>0</TabCount>
            <TabTitle>입금 완료</TabTitle>
          </TabBox>
        </TabLink>
      </TabPane>
      <TabPane
        bordered={tabIndex === 2}
        onClick={() => dispatch(setTabIndex(2))}
      >
        <TabLink to="/my/buying">
          <TabBox>
            <TabCount>0</TabCount>
            <TabTitle>배송 중</TabTitle>
          </TabBox>
        </TabLink>
      </TabPane>
      <TabPane
        bordered={tabIndex === 3}
        onClick={() => dispatch(setTabIndex(3))}
      >
        <TabLink to="/my/buying">
          <TabBox>
            <TabCount>0</TabCount>
            <TabTitle>종료</TabTitle>
          </TabBox>
        </TabLink>
      </TabPane>
    </Tabs>
  );
}

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
export default PurchaseTab;
