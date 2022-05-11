import { ComponentStory } from '@storybook/react';
import MyHome from './MyHome';

export default {
  component: MyHome,
  title: 'organisms/My/MyHome',
};

const Template: ComponentStory<typeof MyHome> = () => <MyHome />;

export const Default = Template.bind({});

Default.args = {};
