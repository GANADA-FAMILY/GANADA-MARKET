import { ComponentStory } from '@storybook/react';
import InputBox from './InputBox';

export default {
  component: InputBox,
  title: 'atoms/My/InputBox',
};

const Template: ComponentStory<typeof InputBox> = (args) => (
  <InputBox {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: '제목없음',
  type: 'text',
  placeholder: 'placeholder',
};
