import { ComponentStory } from '@storybook/react';
import Avatar from './Avatar';

export default {
  component: Avatar,
  title: 'atoms/My/Avatar',
};

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});

Default.args = {
  size: 100,
  alt: 'avatar',
  src: 'https://kream.co.kr/_nuxt/img/blank_profile.4347742.png',
};
