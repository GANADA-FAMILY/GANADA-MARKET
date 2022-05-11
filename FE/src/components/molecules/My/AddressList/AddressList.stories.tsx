import { ComponentStory } from '@storybook/react';
import AddressList from './AddressList';

export default {
  component: AddressList,
  title: 'molecules/My/AddressList',
};

const Template: ComponentStory<typeof AddressList> = (args) => (
  <AddressList {...args} />
);

export const Default = Template.bind({});

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

Default.args = {
  items: dummyList,
};
