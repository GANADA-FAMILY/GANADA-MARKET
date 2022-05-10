import { ComponentStory } from '@storybook/react';
import ModifyBox from './ModifyBox';

export default {
  component: ModifyBox,
  title: 'atoms/My/ModifyBox',
};

const Template: ComponentStory<typeof ModifyBox> = (args) => (
  <ModifyBox {...args} />
);

export const Default = Template.bind({});

Default.args = {
  children: '',
};
