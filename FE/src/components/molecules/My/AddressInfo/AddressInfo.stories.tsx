import { ComponentStory } from '@storybook/react';
import AddressInfo from './AddressInfo';

export default {
  component: AddressInfo,
  title: 'molecules/My/AddressInfo',
};

const Template: ComponentStory<typeof AddressInfo> = (args) => (
  <AddressInfo {...args} />
);

export const Active = Template.bind({});

Active.args = {
  item: {
    addressId: 1,
    addressName: '홍길동',
    addressPhone: '010-3333-3333',
    postalCode: '434343',
    address: '경북 영주시 풍기읍 대동로 23',
    addressDetail: '삼성빌',
    activate: true,
  },
};

export const Inactive = Template.bind({});

Inactive.args = {
  item: {
    addressId: 1,
    addressName: '홍길동',
    addressPhone: '010-3333-3333',
    postalCode: '434343',
    address: '경북 영주시 풍기읍 대동로 23',
    addressDetail: '삼성빌',
    activate: false,
  },
};
