import { ComponentStory } from '@storybook/react';
import Item from './Item';

export default {
  component: Item,
  title: 'atoms/My/Item',
};

const Template: ComponentStory<typeof Item> = (args) => <Item {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: '',
  item: '',
};
