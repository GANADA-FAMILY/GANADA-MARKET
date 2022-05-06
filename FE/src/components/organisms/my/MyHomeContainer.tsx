import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Avatar from '../../atoms/my/Avatar';
import LinkButton from '../../atoms/my/LinkButton';
import Text from '../../atoms/my/Text';
import Title from '../../atoms/my/Title';
import TabPane from '../../atoms/my/TabPane';
import Tabs from '../../molecules/my/Tabs';
import TitleBar from '../../molecules/my/TitleBar';
import List from '../../molecules/my/List';

const user = {
  name: '홍길동',
  email: 'zxc123@naver.com',
  grade: '일반 회원',
};

function MyHomeContainer() {
  return (
    <Container>
      <MembershipContainer>
        <UserDetail>
          <UserAvatar src="https://kream.co.kr/_nuxt/img/blank_profile.4347742.png" />
          <UserInfo>
            <InfoBox>
              <Text size={18} strong>
                {user.name}
              </Text>
              <Text color="gray">{user.email}</Text>
              <LinkButton href="/">프로필 수정</LinkButton>
              <LinkButton href="/">내 스타일</LinkButton>
            </InfoBox>
          </UserInfo>
        </UserDetail>
        <MembershipDetail>
          <MembershipItem>
            <Text size={16}>{user.grade}</Text>
            <Text color="gray" strong>
              회원 등급
            </Text>
          </MembershipItem>
        </MembershipDetail>
      </MembershipContainer>

      <MyHomeTitle title="구매 내역" size={18} src="/my/buying" />
      <PurchaseContainer>
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
      </PurchaseContainer>

      <MyHomeTitle title="판매 내역" size={18} src="/my/selling" />
      <PurchaseContainer>
        <Tabs>
          <TabPane>
            <TabLink to="/my/selling">
              <TabBox>
                <TabTitle>전체</TabTitle>
                <TabCount>0</TabCount>
              </TabBox>
            </TabLink>
          </TabPane>
          <TabPane>
            <TabLink to="/my/selling">
              <TabBox>
                <TabTitle>입찰 중</TabTitle>
                <TabCount>0</TabCount>
              </TabBox>
            </TabLink>
          </TabPane>
          <TabPane>
            <TabLink to="/my/selling">
              <TabBox>
                <TabTitle>진행 중</TabTitle>
                <TabCount>0</TabCount>
              </TabBox>
            </TabLink>
          </TabPane>
          <TabPane>
            <TabLink to="/my/selling">
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
      </PurchaseContainer>
      <MyHomeTitle title="관심 상품" size={18} src="/my/wish" />
      <ListArea>
        <List items={[]} />
      </ListArea>
    </Container>
  );
}
const Container = styled.section``;
const MembershipContainer = styled.div`
  padding: 23px 0 23px 23px;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  span {
    font-size: 14px;
    color: rgba(34, 34, 34, 0.5);
    line-height: 18px;
    letter-spacing: -0.05px;
  }
`;
const UserDetail = styled.div`
  display: flex;
  div + div {
    margin-left: 15px;
  }
`;
const UserAvatar = styled(Avatar)`
  position: relative;
  margin-right: 12px;
  flex-shrink: 0;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;
const InfoBox = styled.div`
  a + a {
    margin-left: 7px;
  }
  .typograph {
    line-height: 21px;
    font-size: 18px;
    letter-spacing: -0.27px;
    font-weight: 600;
  }
`;
const MembershipDetail = styled.div`
  position: relative;
  margin-left: auto;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  strong {
    line-height: 19px;
    font-size: 16px;
    letter-spacing: -0.16px;
    font-weight: 700;
  }
`;
const MembershipItem = styled.div`
  display: inline-block;
  width: 159px;
  text-align: center;
`;
const MyHomeTitle = styled(TitleBar)`
  margin-top: 42px;
  padding-bottom: 16px;
  display: flex;
  max-width: 100%;
`;
const PurchaseContainer = styled.div``;

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

export default MyHomeContainer;
