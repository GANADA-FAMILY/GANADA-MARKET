// /* eslint-disable react/function-component-definition */
// /* eslint-disable storybook/story-exports */

import { ComponentStory } from '@storybook/react';
import Button from './Button';

export default {
  component: Button,
  title: 'atoms/My/Button',
  argTypes: {
    color: { control: 'color' },
  },
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  type: 'button',
  children: '저장',
  className: '',
  disabled: false,
};
