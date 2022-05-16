import React from 'react';
import styled from '@emotion/styled';
import TitleBar from 'components/molecules/My/TitleBar';
import LinkButton from 'components/atoms/My/LinkButton';
import Text from 'components/atoms/My/Text';
import MyListBox from './MyListBox';

function MyAddress() {
  return (
    <Container>
      <TitleContent>
        <TitleBar title="주소록" size={24} lineHeight={12} color="black2" />
        <ButtonBox>
          <AddButton href="">
            <Text size={12} color="gray2" lineHeight={32}>
              + 새 배송지 추가
            </Text>
          </AddButton>
        </ButtonBox>
      </TitleContent>
      <MyListBox items={dummyList} />
    </Container>
  );
}

const Container = styled.div`
  min-height: 315px;
`;
const TitleContent = styled.div`
  display: flex;
  padding: 5px 0 6px;
`;
const ButtonBox = styled.div`
  margin-left: auto;
  padding-left: 30px;
  flex-shrink: 0;
`;
const AddButton = styled(LinkButton)`
  margin-right: 0;
  padding: 0 14px;
  line-height: 32px;
  border-radius: 10px;
  border: 1px solid #222;
  letter-spacing: -0.06px;
  text-decoration: none;
  margin-top: 0;
`;

export default MyAddress;

const dummyList = [
  {
    addressId: 1,
    addressName: '홍길동',
    addressPhone: '010-3333-3333',
    postalCode: '434343',
    address: '경북 영주시 풍기읍 대동로 23',
    addressDetail: '삼성빌',
    activate: true,
  },
  {
    addressId: 2,
    addressName: '홍길동',
    addressPhone: '010-3333-3333',
    postalCode: '424343',
    address: '경북 영주시 풍기읍 대동로 123',
    addressDetail: '이성빌',
    activate: false,
  },
  {
    addressId: 3,
    addressName: '고길동',
    addressPhone: '010-3333-3333',
    postalCode: '434343',
    address: '경북 영주시 풍기읍 대동로 1323',
    addressDetail: '사성빌',
    activate: false,
  },
  {
    addressId: 4,
    addressName: '홍길동',
    addressPhone: '010-3333-3333',
    postalCode: '434343',
    address: '경북 영주시 풍기읍 대동로 1323',
    addressDetail: '삼성빌',
    activate: false,
  },
];
