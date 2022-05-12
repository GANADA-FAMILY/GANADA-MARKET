import { ComponentStory } from '@storybook/react';
import MyListBox from './MyListBox';

export default {
  component: MyListBox,
  title: 'organisms/My/MyAddress/MyListBox',
};

const Template: ComponentStory<typeof MyListBox> = (args) => (
  <MyListBox {...args} />
);

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

export const Default = Template.bind({});
Default.args = {
  items: dummyList,
};
