import { ComponentStory } from '@storybook/react';
import PurchaseBox from './PurchaseBox';

export default {
  component: PurchaseBox,
  title: 'organisms/My/MyHome/PurchaseBox',
};

const Template: ComponentStory<typeof PurchaseBox> = (args) => <PurchaseBox />;

export const Default = Template.bind({});
Default.args = {};
