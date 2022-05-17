import { ComponentStory } from '@storybook/react';
import BankBox from './BankBox';

export default {
  component: BankBox,
  title: 'organisms/My/MyAccount/BankBox',
};

const Template: ComponentStory<typeof BankBox> = (args) => (
  <BankBox {...args} />
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
