import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Text from './Text';

export default {
  component: Text,
  title: 'atoms/Main/Text',
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Text Default',
  fontSize: 14,
  color: 'gray',
  fontWeight: '',
  lineHeight: '',
  className: '',
};
