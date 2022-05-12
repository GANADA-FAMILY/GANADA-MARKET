import { ComponentStory } from '@storybook/react';
import SideNavBar from './SideNavBar';

export default {
  component: SideNavBar,
  title: 'organisms/My/SideNavBar',
};

const Template: ComponentStory<typeof SideNavBar> = () => <SideNavBar />;

export const Default = Template.bind({});
