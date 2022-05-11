import { ComponentStory } from '@storybook/react';
import { useRef } from 'react';
import ProfileHeader from './ProfileHeader';

export default {
  component: ProfileHeader,
  title: 'organisms/My/MyProfile/ProfileHeader',
};

const Template: ComponentStory<typeof ProfileHeader> = (args) => (
  <ProfileHeader {...args} />
);

export const Default = Template.bind({});

Default.args = {
  user: {
    userEmail: 'zxc123@naver.com',
    userNickname: 'zxc123',
    userPhone: '010-3333-4444',
    profileImageUrl: 'https://kream.co.kr/_nuxt/img/blank_profile.4347742.png',
    grade: '일반 회원',
  },
  onClickImage: () => null,
  onChangeImage: () => null,
  newImage: '',
  // forwardedRef: useRef<HTMLInputElement>(null),
};
