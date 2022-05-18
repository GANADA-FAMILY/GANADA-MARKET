import { ComponentStory } from '@storybook/react';
import MyProfile from './MyProfile';

export default {
  component: MyProfile,
  title: 'organisms/My/MyProfile',
};

const Template: ComponentStory<typeof MyProfile> = (args) => (
  <MyProfile {...args} />
);

export const Default = Template.bind({});

Default.args = {};
