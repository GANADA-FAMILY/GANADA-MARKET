import { ComponentStory } from '@storybook/react';
import MyProfile from './MyProfile';

export default {
  component: MyProfile,
  title: 'organisms/My/MyProfile',
};

const Template: ComponentStory<typeof MyProfile> = () => <MyProfile />;

export const Default = Template.bind({});

Default.args = {};
