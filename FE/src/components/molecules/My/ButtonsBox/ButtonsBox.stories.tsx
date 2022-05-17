import { ComponentStory } from '@storybook/react';
import Address from 'types/Entity/UserAPI/Address';
import ButtonsBox from './ButtonsBox';

export default {
  component: ButtonsBox,
  title: 'molecules/My/ButtonsBox',
};

const Template: ComponentStory<typeof ButtonsBox> = (args) => (
  <ButtonsBox {...args} />
);

export const Default = Template.bind({});
const asd: Address = {
  addressId: 1,
  addressName: '홍길동',
  addressPhone: '010-3333-3333',
  postalCode: '434343',
  address: '경북 영주시 풍기읍 대동로 23',
  addressDetail: '삼성빌',
  activate: true,
};
Default.args = {
  item: asd,
};

export const InActive = Template.bind({});

InActive.args = {
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
