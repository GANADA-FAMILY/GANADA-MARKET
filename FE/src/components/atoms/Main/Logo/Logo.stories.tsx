import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Logo from './Logo';

export default {
  component: Logo,
  title: 'atoms/Main/Logo',
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Default = Template.bind({});

Default.args = {
  src: '',
  alt: '',
};
