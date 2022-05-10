import { ComponentStory } from '@storybook/react';
import TabPane from './TabPane';

export default {
  component: TabPane,
  title: 'atoms/My/TabPane',
};

const Template: ComponentStory<typeof TabPane> = (args) => (
  <TabPane {...args} />
);

export const Default = Template.bind({});

Default.args = {
  children: '',
};
