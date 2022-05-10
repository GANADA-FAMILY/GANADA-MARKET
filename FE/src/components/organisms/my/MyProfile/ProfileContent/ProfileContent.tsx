import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import User from 'type/User';
import InputBox from 'components/atoms/my/InputBox/InputBox';
import Title from 'components/atoms/my/Title/Title';
import InfoGroup from 'components/molecules/my/InfoGroup';
import InfoItem from 'components/molecules/my/InfoItem';

interface ProfileContentProps {
  user: User;
}

function ProfileContent({ user }: ProfileContentProps) {
  const submitUserInfo = () => {
    console.log(123);
  };
  return (
    <StyledBox>
      <InfoGroup title="로그인 정보">
        <InfoItem
          title="이메일 주소"
          type="email"
          submit={submitUserInfo}
          value={user.userEmail}
        />
        <InfoItem
          title="비밀번호"
          type="password"
          submit={submitUserInfo}
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
      </InfoGroup>
      <InfoGroup title="개인 정보">
        <InfoItem
          title="닉네임"
          type="text"
          submit={submitUserInfo}
          value={user.userNickname}
        >
          <Title level={5}>닉네임</Title>
          <InputBox
            title="새로운 닉네임"
            type="text"
            placeholder="고객님의 새로운 닉네임"
          />
        </InfoItem>
        <InfoItem
          title="휴대폰 번호"
          type="phone"
          submit={submitUserInfo}
          value={user.userPhone}
          modify={() => console.log('본인인증!')}
        />
      </InfoGroup>
      <WithdrawalLink to="/">회원 탈퇴</WithdrawalLink>
    </StyledBox>
  );
}

const StyledBox = styled.div`
  padding-top: 38px;
  max-width: 480px;
  > div ~ div {
    padding-top: 58px;
  }
`;
const WithdrawalLink = styled(Link)`
  margin-top: 55px;
  padding: 5px 0;
  display: inline-block;
  font-size: 13px;
  letter-spacing: -0.07px;
  text-decoration: underline;
`;
export default ProfileContent;
