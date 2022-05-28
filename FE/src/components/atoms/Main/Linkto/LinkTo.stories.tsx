import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LinkTo from './LinkTo';

export default {
  component: LinkTo,
  title: 'atoms/Main/LinkTo',
} as ComponentMeta<typeof LinkTo>;

const Template: ComponentStory<typeof LinkTo> = (args) => <LinkTo {...args} />;

export const Default = Template.bind({});

Default.args = {
  to: '',
};
