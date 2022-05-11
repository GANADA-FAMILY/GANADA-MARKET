import { ComponentStory } from '@storybook/react';
import MenuItem from './MenuItem';

export default {
  component: MenuItem,
  title: 'atoms/my/MenuItem',
};

const Template: ComponentStory<typeof MenuItem> = (args) => (
  <MenuItem {...args} />
);

export const Default = Template.bind({});

Default.args = {
  className: '',
  disabled: false,
  onClick: () => {},
  selected: false,
  children: '',
};
