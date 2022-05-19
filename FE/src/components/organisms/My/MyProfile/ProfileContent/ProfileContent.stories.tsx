import { ComponentStory } from '@storybook/react';
import ProfileContent from './ProfileContent';

export default {
  component: ProfileContent,
  title: 'organisms/My/MyProfile/ProfileContent',
};

const Template: ComponentStory<typeof ProfileContent> = () => (
  <ProfileContent />
);

export const Default = Template.bind({});

Default.args = {
  user: {
    userEmail: 'zxc123@naver.com',
    userNickname: 'zxc123',
    userPhone: '010-3333-4444',
    profileImageUrl: 'https://kream.co.kr/_nuxt/img/blank_profile.4347742.png',
    grade: '일반 회원',
    orderHistory: [],
    salesHistory: [],
  },
};
