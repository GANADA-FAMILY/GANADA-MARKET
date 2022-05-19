import { ComponentStory } from '@storybook/react';
import MembershipBox from './MembershipBox';

export default {
  component: MembershipBox,
  title: 'organisms/My/MyHome/MembershipBox',
};

const Template: ComponentStory<typeof MembershipBox> = (args) => (
  <MembershipBox {...args} />
);

export const Default = Template.bind({});

const user = {
  userEmail: 'zxc123@naver.com',
  userNickname: 'zxc123',
  userPhone: '01033334444',
  profileImageUrl: 'https://kream.co.kr/_nuxt/img/blank_profile.4347742.png',
  grade: '일반 회원',
  orderHistory: [],
  salesHistory: [],
};

Default.args = {
  user,
};
