import { ComponentStory } from '@storybook/react';
import { InputBox, Title } from 'components/atoms/My';
import List from './List';

export default {
  component: List,
  title: 'molecules/My/List',
};

const Template: ComponentStory<typeof List> = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [],
};
