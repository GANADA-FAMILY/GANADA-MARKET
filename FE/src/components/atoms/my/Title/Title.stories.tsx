import { ComponentStory } from '@storybook/react';
import Title from './Title';

export default {
  component: Title,
  title: 'atoms/My/Title',
  argTypes: {
    color: { control: 'color' },
  },
};

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Default = Template.bind({});

Default.args = {
  className: '',
  fontWeight: '',
  color: 'black',
  display: 'block',
  textAlign: 'center',
  style: '',
  level: 5,
  size: 14,
  lineHeight: 15,
  children: '',
};
