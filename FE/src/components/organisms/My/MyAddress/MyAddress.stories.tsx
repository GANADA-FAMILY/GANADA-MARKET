import { ComponentStory } from '@storybook/react';
import MyAddress from './MyAddress';

export default {
  component: MyAddress,
  title: 'organisms/My/MyAddress',
};

const Template: ComponentStory<typeof MyAddress> = (args) => <MyAddress />;

export const Default = Template.bind({});

Default.args = {};
