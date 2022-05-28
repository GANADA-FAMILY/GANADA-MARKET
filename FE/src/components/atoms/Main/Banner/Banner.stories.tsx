import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Banner from './Banner';

export default {
  component: Banner,
  title: 'atoms/Main/Banner',
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = (args) => <Banner {...args} />;

export const Default = Template.bind({});

Default.args = {
  src: '',
  onClick: () => {},
};
