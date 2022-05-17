import { ComponentStory } from '@storybook/react';
import MyAccount from './MyAccount';

export default {
  component: MyAccount,
  title: 'organisms/My/MyAccount',
};

const Template: ComponentStory<typeof MyAccount> = (args) => (
  <MyAccount {...args} />
);

export const Default = Template.bind({});

Default.args = {
  bank: {},
};

export const Inserted = Template.bind({});

Inserted.args = {
  bank: {
    bank: '신한',
    bankNum: '110333444444',
    bankHolder: '홍길동',
  },
};
