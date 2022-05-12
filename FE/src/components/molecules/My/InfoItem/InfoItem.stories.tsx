import { ComponentStory } from '@storybook/react';
import { InputBox, Title } from 'components/atoms/My';
import InfoItem from './InfoItem';

export default {
  component: InfoItem,
  title: 'molecules/My/InfoItem',
};

const Template: ComponentStory<typeof InfoItem> = (args) => (
  <InfoItem {...args} />
);

export const Text = Template.bind({});

Text.args = {
  children: '',
  title: '',
  type: 'text',
  value: '',
  submit: () => null,
};

export const Email = Template.bind({});

Email.args = {
  children: '',
  title: '제목',
  type: 'email',
  value: 'sds@sadsa',
  submit: () => null,
};

export const Password = Template.bind({});

function PasswordChildren() {
  return (
    <>
      <Title level={5}>비밀번호 변경</Title>
      <InputBox
        title="이전 비밀번호"
        type="password"
        placeholder="영문,숫자,특수문자 조합 8-16자"
      />
      <InputBox
        title="새 비밀번호"
        type="password"
        placeholder="영문,숫자,특수문자 조합 8-16자"
      />
    </>
  );
}
Password.args = {
  children: PasswordChildren(),
  title: '제목',
  type: 'password',
  value: '',
  submit: () => null,
};

export const Phone = Template.bind({});

Phone.args = {
  children: '',
  title: '제목',
  type: 'phone',
  value: '010-0000-0000',
  submit: () => null,
};
