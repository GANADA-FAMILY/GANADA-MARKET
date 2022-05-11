import { ComponentStory } from '@storybook/react';
import TitleBar from './TitleBar';

export default {
  component: TitleBar,
  title: 'molecules/My/TitleBar',
};

const Template: ComponentStory<typeof TitleBar> = (args) => (
  <TitleBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: '제목',
  size: 14,
  src: '/',
  bordered: true,
  lineHeight: 14,
  color: 'black',
};
