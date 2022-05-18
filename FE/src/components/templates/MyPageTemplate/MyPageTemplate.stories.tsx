import { ComponentStory } from '@storybook/react';
import {
  MyAddress,
  MyHome,
  MyProfile,
  MyPurchase,
} from 'components/organisms/My';
import MyPageTemplate from './MyPageTemplate';

export default {
  component: MyPageTemplate,
  title: 'templates/MyPageTemplate',
};

const Template: ComponentStory<typeof MyPageTemplate> = (args) => (
  <MyPageTemplate {...args} />
);

export const MyAddressCase = Template.bind({});

MyAddressCase.args = {
  element: <MyAddress items={[]} />,
};
export const MyHomeCase = Template.bind({});

MyHomeCase.args = {
  element: <MyHome />,
};
export const MyProfileCase = Template.bind({});

MyProfileCase.args = {
  element: (
    <MyProfile
      item={{
        userEmail: 'zxc123@naver.com',
        userNickname: 'zxc123',
        userPhone: '010-3333-4444',
        profileImageUrl:
          'https://kream.co.kr/_nuxt/img/blank_profile.4347742.png',
        grade: '일반 회원',
      }}
    />
  ),
};
export const MyPurchaseCase = Template.bind({});

MyPurchaseCase.args = {
  element: <MyPurchase />,
};
