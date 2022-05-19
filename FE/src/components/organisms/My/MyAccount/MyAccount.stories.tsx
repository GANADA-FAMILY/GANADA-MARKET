import { ComponentStory } from '@storybook/react';
import MyAccount from './MyAccount';

export default {
  component: MyAccount,
  title: 'organisms/My/MyAccount',
};

const Template: ComponentStory<typeof MyAccount> = () => <MyAccount />;

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
