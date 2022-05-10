import { ComponentStory } from '@storybook/react';
import ModifyButtonBox from './ModifyButtonBox';

export default {
  component: ModifyButtonBox,
  title: 'molecules/My/ModifyButtonBox',
};

const Template: ComponentStory<typeof ModifyButtonBox> = (args) => (
  <ModifyButtonBox {...args} />
);

export const Default = Template.bind({});

Default.args = {
  submit: () => {},
  cancel: () => {},
};
