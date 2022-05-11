import { ComponentStory } from '@storybook/react';
import SellBox from './SellBox';

export default {
  component: SellBox,
  title: 'organisms/My/MyHome/SellBox',
};

const Template: ComponentStory<typeof SellBox> = () => <SellBox />;

export const Default = Template.bind({});
Default.args = {};
