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
  element: <MyProfile />,
};
export const MyPurchaseCase = Template.bind({});

MyPurchaseCase.args = {
  element: <MyPurchase />,
};
