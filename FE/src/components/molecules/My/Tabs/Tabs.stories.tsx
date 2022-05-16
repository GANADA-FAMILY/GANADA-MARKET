import { ComponentStory } from '@storybook/react';
import Tabs from './Tabs';

export default {
  component: Tabs,
  title: 'molecules/My/Tabs',
};

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: '',
};
