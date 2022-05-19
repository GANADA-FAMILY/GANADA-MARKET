import { ComponentStory } from '@storybook/react';
import MembershipDetail from './MembershipDetail';

export default {
  component: MembershipDetail,
  title: 'molecules/My/HomeInfo/MembershipDetail',
};

const Template: ComponentStory<typeof MembershipDetail> = (args) => (
  <MembershipDetail {...args} />
);

export const Default = Template.bind({});

Default.args = {
  user: {
    userEmail: 'zxc123@naver.com',
    userNickname: 'zxc123',
    userPhone: '01033334444',
    profileImageUrl: 'https://kream.co.kr/_nuxt/img/blank_profile.4347742.png',
    grade: '일반 회원',
    orderHistory: [],
    salesHistory: [],
  },
};
