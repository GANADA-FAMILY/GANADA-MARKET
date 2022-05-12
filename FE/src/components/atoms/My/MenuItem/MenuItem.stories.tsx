import { ComponentStory } from '@storybook/react';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';

export default {
  component: MenuItem,
  title: 'atoms/My/MenuItem',
};

const Template: ComponentStory<typeof MenuItem> = (args) => (
  <MenuItem {...args} />
);

export const Default = Template.bind({});

Default.args = {
  className: '',
  disabled: false,
  onClick: () => null,
  selected: false,
  children: '',
};

export const Example = Template.bind({});

function Example1() {
  return <Link to="/my/buying">구매 내역</Link>;
}
Example.args = {
  className: '',
  disabled: false,
  onClick: () => null,
  selected: false,
  children: Example1(),
};
