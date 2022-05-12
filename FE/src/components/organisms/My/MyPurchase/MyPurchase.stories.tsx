import { ComponentStory } from '@storybook/react';
import MyPurchase from './MyPurchase';

export default {
  component: MyPurchase,
  title: 'organisms/My/MyPurchase',
};

const Template: ComponentStory<typeof MyPurchase> = () => <MyPurchase />;

export const Default = Template.bind({});

Default.args = {};
