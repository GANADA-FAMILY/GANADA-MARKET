// /* eslint-disable react/function-component-definition */
// /* eslint-disable storybook/story-exports */

import { ComponentStory } from '@storybook/react';
import Text, { TextProps } from './Text';

export default {
  component: Text,
  title: 'atoms/My/Text',
  argTypes: {
    color: { control: 'color' },
  },
};

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Default = Template.bind({});

Default.args = {
  className: '',
  color: 'black',
  textAlign: '',
  size: 14,
  strong: false,
  inline: false,
  lineHeight: 14,
  children: '',
};
