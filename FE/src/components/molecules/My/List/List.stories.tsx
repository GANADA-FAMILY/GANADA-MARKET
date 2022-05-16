import styled from '@emotion/styled';
import { ComponentStory } from '@storybook/react';
import { Item } from 'components/atoms/My';
import { Address, Product } from 'types/Entity';
import { AddressInfo, ButtonsBox } from 'components/molecules/My';
import List from './List';

export default {
  component: List,
  title: 'test/List',
};

const Template: ComponentStory<typeof List> = (args) => <List {...args} />;
//  default
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

// address

function AddressListItem(item: Address | any, index: number) {
  return (
    <StyledItem item={item}>
      <AddressInfo item={item} />
      <ButtonsBox item={item} />
    </StyledItem>
  );
}

const StyledItem = styled(Item)`
  padding: ${(props) => (props.item.activate ? `30px 0 29px` : `17px 0 16px`)};
  border-bottom: ${(props) =>
    props.item.activate ? `2px solid #222` : `1px solid #ebebeb`};
`;
export const AddressList = Template.bind({});

AddressList.args = {
  dataSoruce: dummyList,
  renderItem: AddressListItem,
};

// wishlist
const dummyProductList = [
  {
    auctionId: 23,
    auctionTitle: 'string',
    endTime: '2022-05-11T04:38:40.000+00:00',
    status: false,
  },
  {
    auctionId: 23,
    auctionTitle: 'string',
    endTime: '2022-05-11T04:38:40.000+00:00',
    status: false,
  },
  {
    auctionId: 23,
    auctionTitle: 'string',
    endTime: '2022-05-11T04:38:40.000+00:00',
    status: false,
  },
  {
    auctionId: 23,
    auctionTitle: 'string',
    endTime: '2022-05-11T04:38:40.000+00:00',
    status: false,
  },
];

// function AddressListItem(item: Address | any, index: number) {
//   return (
//     <StyledItem item={item}>
//       <AddressInfo item={item} />
//       <ButtonsBox item={item} />
//     </StyledItem>
//   );
// }

// const StyledItem = styled(Item)`
//   padding: ${(props) => (props.item.activate ? `30px 0 29px` : `17px 0 16px`)};
//   border-bottom: ${(props) =>
//     props.item.activate ? `2px solid #222` : `1px solid #ebebeb`};
// `;
// export const AddressList = Template.bind({});

// AddressList.args = {
//   dataSoruce: dummyProductList,
//   renderItem: AddressListItem,
// };
