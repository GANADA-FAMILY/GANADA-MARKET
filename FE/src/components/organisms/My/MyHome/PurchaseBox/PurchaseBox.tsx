import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { List, Tabs } from 'components/molecules/My';
import { TabPane } from 'components/atoms/My';

function PurchaseBox() {
  return (
    <StyledBox>
      <Tabs>
        <TabPane>
          <TabLink to="/my/buying">
            <TabBox>
              <TabTitle>전체</TabTitle>
              <TabCount>0</TabCount>
            </TabBox>
          </TabLink>
        </TabPane>
        <TabPane>
          <TabLink to="/my/buying">
            <TabBox>
              <TabTitle>입찰 중</TabTitle>
              <TabCount>0</TabCount>
            </TabBox>
          </TabLink>
        </TabPane>
        <TabPane>
          <TabLink to="/my/buying">
            <TabBox>
              <TabTitle>진행 중</TabTitle>
              <TabCount>0</TabCount>
            </TabBox>
          </TabLink>
        </TabPane>
        <TabPane>
          <TabLink to="/my/buying">
            <TabBox>
              <TabTitle>종료</TabTitle>
              <TabCount>0</TabCount>
            </TabBox>
          </TabLink>
        </TabPane>
      </Tabs>
      <ListArea>
        <List items={[]} />
      </ListArea>
    </StyledBox>
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
const ListArea = styled.div``;
const StyledBox = styled.div``;

export default PurchaseBox;
