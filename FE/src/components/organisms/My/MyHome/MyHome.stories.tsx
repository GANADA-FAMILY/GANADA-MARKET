import { ComponentStory } from '@storybook/react';
import MyHome from './MyHome';

export default {
  component: MyHome,
  title: 'organisms/My/MyHome',
};

const Template: ComponentStory<typeof MyHome> = (args) => <MyHome {...args} />;

export const Default = Template.bind({
  user: {
    userEmail: 'zxc123@naver.com',
    userNickname: 'zxc123',
    userPhone: '01033334444',
    profileImageUrl: 'https://kream.co.kr/_nuxt/img/blank_profile.4347742.png',
    grade: '일반 회원',
    orderHistory: [],
    salesHistory: [],
  },
});

Default.args = {};
