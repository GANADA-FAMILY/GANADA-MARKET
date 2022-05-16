import { ComponentStory } from '@storybook/react';
import MyWish from './MyWish';

export default {
  component: MyWish,
  title: 'organisms/My/MyWish',
};

const Template: ComponentStory<typeof MyWish> = () => <MyWish />;

export const Default = Template.bind({});
