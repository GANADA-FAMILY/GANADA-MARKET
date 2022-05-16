import { ComponentStory } from '@storybook/react';
import { InputBox, Title } from 'components/atoms/My';
import InfoGroup from './InfoGroup';
import InfoItem from '../InfoItem';

export default {
  component: InfoGroup,
  title: 'molecules/My/InfoGroup',
};

const Template: ComponentStory<typeof InfoGroup> = (args) => (
  <InfoGroup {...args} />
);

export const Default = Template.bind({});
const dummyUser = {
  userEmail: 'zxc123@naver.com',
  userNickname: 'zxc123',
  userPhone: '010-3333-4444',
  profileImageUrl: 'https://kream.co.kr/_nuxt/img/blank_profile.4347742.png',
  grade: '일반 회원',
};
function LoginInfo() {
  const user = dummyUser;
  return (
    <>
      <InfoItem
        title="이메일 주소"
        type="email"
        submit={() => null}
        value={user.userEmail}
      />
      <InfoItem
        title="비밀번호"
        type="password"
        submit={() => null}
        value={'●'.repeat(8)}
      >
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
      </InfoItem>
    </>
  );
}

Default.args = {
  children: LoginInfo(),
  title: '로그인 정보',
};
