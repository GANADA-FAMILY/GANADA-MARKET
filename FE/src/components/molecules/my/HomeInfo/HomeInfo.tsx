import React from 'react';
import styled from '@emotion/styled';
import User from '../../../../type/User';
import Text from '../../../atoms/my/Text';
import LinkButton from '../../../atoms/my/LinkButton';

interface HomeInfoProps {
  user: User;
}
function HomeInfo({ user }: HomeInfoProps) {
  return (
    <Molecules>
      <InfoBox>
        <Text size={18} strong lineHeight={21}>
          {user.userNickname}
        </Text>
        <Text color="gray" size={14} lineHeight={18}>
          {user.userEmail}
        </Text>
        <LinkButton href="/my/profile">프로필 수정</LinkButton>
        <LinkButton href={`/social/users/${user.userNickname}`}>
          내 스타일
        </LinkButton>
      </InfoBox>
    </Molecules>
  );
}

const Molecules = styled.div`
  display: flex;
  div + div {
    margin-left: 15px;
  }
`;
const InfoBox = styled.div`
  a + a {
    margin-left: 7px;
  }
  p {
    letter-spacing: -0.27px;
  }
`;

export default HomeInfo;
