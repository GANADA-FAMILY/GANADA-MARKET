import { ComponentStory } from '@storybook/react';
import Modal from './Modal';

export default {
  component: Modal,
  title: 'molecules/My/Modal',
};

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: '',
  title: '',
  visible: false,
};
