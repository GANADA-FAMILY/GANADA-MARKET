import { ComponentStory } from '@storybook/react';
import HomeInfo from './HomeInfo';

export default {
  component: HomeInfo,
  title: 'molecules/My/HomeInfo',
};

const Template: ComponentStory<typeof HomeInfo> = (args) => (
  <HomeInfo {...args} />
);

export const Default = Template.bind({});

Default.args = {
  user: {
    userEmail: 'zxc123@naver.com',
    userNickname: 'zxc123',
    userPhone: '01033334444',
    profileImageUrl: 'https://kream.co.kr/_nuxt/img/blank_profile.4347742.png',
    grade: '일반 회원',
  },
};
