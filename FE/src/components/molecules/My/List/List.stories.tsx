import styled from '@emotion/styled';
import { ComponentStory } from '@storybook/react';
import { Item } from 'components/atoms/My';
import { Address, Bank } from 'types/Entity';
import { AddressInfo, ButtonsBox } from '../AddressList';
import List from './List';

export default {
  component: List,
  title: 'test/List',
};

const Template: ComponentStory<typeof List> = (args) => <List {...args} />;

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

function defaultItem(item: Address | any, index: number) {
  return (
    <li key={item.addressId}>
      <h4>{item.addressId}</h4>
      <h4>{item.addressName}</h4>
      <h4>{item.addressPhone}</h4>
      <h4>{item.postalCode}</h4>
    </li>
  );
}

export const Default = Template.bind({});
Default.args = {
  dataSoruce: dummyList,
  renderItem: defaultItem,
};

function AddressListItem(item: Address | any, index: number) {
  return (
    <StyledItem item={item}>
      <AddressInfo item={item} />
      <ButtonsBox item={item} />
    </StyledItem>
  );
}

export const AddressList = Template.bind({});
AddressList.args = {
  dataSoruce: dummyList,
  renderItem: AddressListItem,
};

const StyledItem = styled(Item)`
  padding: ${(props) => (props.item.activate ? `30px 0 29px` : `17px 0 16px`)};
  border-bottom: ${(props) =>
    props.item.activate ? `2px solid #222` : `1px solid #ebebeb`};
`;

const dummyData2 = [
  {
    bank: '신한',
    bankNum: '12321131',
    bankHolder: '홍길동',
  },
  {
    bank: '신한2',
    bankNum: '123221',
    bankHolder: '홍길동2',
  },
  {
    bank: '신한3',
    bankNum: '12332131',
    bankHolder: '홍길동3',
  },
  {
    bank: '신한4',
    bankNum: '12322131',
    bankHolder: '홍길동4',
  },
];

function BankListItem(item: Bank | any, index: number) {
  const { bank, bankNum, bankHolder } = item;
  return (
    <div>
      <li key={bank}>
        <h4>{bank}</h4>
        <h4>{bankNum}</h4>
        <h4>{bankHolder}</h4>
      </li>
    </div>
  );
}
export const BankList = Template.bind({});

BankList.args = {
  dataSoruce: dummyData2,
  renderItem: BankListItem,
};
